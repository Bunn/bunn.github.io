---
layout:     post
title:      "Private Frameworks"
date:       2019-03-16 00:00:00
category:   Frameworks
---

### Why Bother?

Every iOS developer knows that if you ship an iOS app using private frameworks you'll have your app rejected by the App Store review team, so why bother understanding how to find and use private frameworks? This is actually a good point but besides the fact that it's a really cool way of learning how Apple uses their internal frameworks, which might help you have ideas of how to do your own, here's the main reason I recommend doing that: It's fun! 

### Dumping Classes 

To use a private framework we need to know where they are and what they do. Where they are depends on where you're running, if it's on the simulator, the path is:
~~~
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/CoreSimulator/Profiles/Runtimes/iOS.simruntime/Contents/Resources/RuntimeRoot/System/Library/PrivateFrameworks
~~~

If it's on your real device, the path changes to:
~~~
/System/Library/PrivateFrameworks/
~~~
If you do a `ls` there you'll see the private framework list
~~~
ls /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/CoreSimulator/Profiles/Runtimes/iOS.simruntime/Contents/Resources/RuntimeRoot/System/Library/PrivateFrameworks
AMPCoreUI.framework
AOPHaptics.framework
AOSKit.framework
ATFoundation.framework
AVConference.framework
AXCoreUtilities.framework
AXMediaUtilities.framework
AXMediaUtilitiesService.xpc
AXRuntime.framework
Accessibility.framework
...
...
~~~

Now that we know where to find the private frameworks, how do we check what they can do? We can use a command line utility called [class-dump](https://github.com/nygard/class-dump){:target="_blank"} which will generate header files with class interfaces from a given executable.

Download the class-dump and let's use to generate some header files for a private framework so we can play around with it, let's try the `BatteryCenter.framework`, here's how you do it:

~~~
./class-dump /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/CoreSimulator/Profiles/Runtimes/iOS.simruntime/Contents/Resources/RuntimeRoot/System/Library/PrivateFrameworks/BatteryCenter.framework/BatteryCenter > BatteryCenter.h
~~~

Now you can open `BatteryCenter.h` and take a look at the methods and have an idea of what can be done with it. Important to note that this is very messy because it's dumped from a compiled code with optimization flags, etc, do not think that this is what the actual code from Apple looks like :) 

>If you don't want to do all that, there are many repos like [this one](https://github.com/JaviSoto/iOS10-Runtime-Headers){:target="_blank"} that have already done this work for you. Also worth mentioning the [RuntimeBrowser project](https://github.com/nst/RuntimeBrowser/){:target="_blank"} that allows you to inspect the headers on your device in runtime.

### Using the Private Framework

Let's create a simple project just to have an idea of how to load a private framework. Although some of these things can be done with Swift, let's use Objective-C since it's easier to deal with introspection.

First thing we need to do is to load the private framework, since I'll run this on my actual device I'll use the path for the device like we saw above, like so:
~~~swift 
NSBundle *privateFramework = [[NSBundle alloc] initWithPath:@"/System/Library/PrivateFrameworks/BatteryCenter.framework"];
[privateFramework load];
~~~

That will load the framework on your runtime but what can we do with that? Remember the `BatteryCenter.h` we exported? Let's take a look at the file and see if there's something that looks interesting to use.

There's an interface called `BCBatteryDeviceController`, looks like it has some methods that we can take a look:

~~~swift

@interface BCBatteryDeviceController : NSObject
{
    NSMutableDictionary *_devicesByIdentifier;
    NSArray *_sortedDevices;
    struct __CFRunLoopSource *_powerSourcesChangedRunLoopSource;
    struct __CFRunLoopSource *_accessoriesChangedRunLoopSource;
    struct __CFRunLoopSource *_accessoriesLimitedPowerRunLoopSource;
    NSMapTable *_handlersByIdentifier;
    _Bool _batterySaverModeActive;
    _Bool _chargeChangeHandlingDisabled;
    NSObject<OS_dispatch_queue> *_queue;
    unsigned long long _numFakeDevices;
}

+ (id)_glyphForBatteryDevice:(id)arg1;
+ (id)_glyphForBatteryDeviceWithTransport:(long long)arg1 accessoryCategory:(unsigned long long)arg2 vendor:(long long)arg3 productIdentifier:(long long)arg4 parts:(unsigned long long)arg5;
+ (id)_internalBatteryDeviceGlyph;
+ (id)sharedInstance;
- (id)_fakeDevicePowerSourceDescriptions;
...
...
...
@property(readonly, nonatomic) __weak NSArray *connectedDevices;
@property(readonly, nonatomic) NSString *connectedDevicesDidChangeNotificationName;
- (void)dealloc;
- (id)init;

@end
~~~

Notice that you don't need all the methods declarations, just the ones you're interested to check so Xcode will not complain once you call it. Create a header file with the pieces you want, add to your Xcode project and done, now you can call the methods on your project.

First of all, let's create a define just as convenience to reference the `BCBatteryDeviceController` class like so:
~~~swift
#define BatteryDeviceController NSClassFromString(@"BCBatteryDeviceController")
~~~

Looking back at our header file, let's check what this `+ (id)_internalBatteryDeviceGlyph;` returns:

~~~swift
 id deviceGlyph = [BatteryDeviceController _internalBatteryDeviceGlyph];
~~~

Let's check it out on [LLDB](http://localhost:4000/lldb/2019/03/05/lldb-friend.html){:target="_blank"}:
~~~
(lldb) po deviceGlyph
<UIImage: 0x280455c70>, {14, 28}

(lldb) visualize deviceGlyph
~~~

And here's the result for my white iPhone 7 plus:

![](/img/private_framework/device_glyph.png)

Back at our header file you can see that there's a `+ (id)sharedInstance;` method, which looks like an interesting way to easily get access to an instance, let's try it:

~~~swift
- (void)testBattery {
    NSBundle *privateFramework = [[NSBundle alloc] initWithPath:@"/System/Library/PrivateFrameworks/BatteryCenter.framework"];
    [privateFramework load];
    BCBatteryDeviceController *controller = [BatteryDeviceController sharedInstance];
}
~~~

We can now go back to LLDB and play around with the instance, this `@property(readonly, nonatomic) __weak NSArray *connectedDevices;` sounds promising:

~~~
(lldb) po controller.connectedDevices
<__NSArrayI 0x282f4f080>(
<BCBatteryDevice: 0x280142b80; vendor = Apple; productIdentifier = 0; parts = (null); identifier = 2490467; matchIdentifier = (null); name = Pandemonium; groupName =InternalBattery-0; percentCharge = 77; lowBattery = NO; batterySaverModeActive = NO; connected = YES; charging = YES; internal = YES; powerSource = YES; poweredSoureState = AC Power; transportType = 1; accessoryIdentifier = (null); accessoryCategory = Unknown>,
<BCBatteryDevice: 0x280146500; vendor = Apple; productIdentifier = 0; parts = (null); identifier = 4199892; matchIdentifier = (null); name = Lut Gholein; groupName =Lut Gholein; percentCharge = 79; lowBattery = NO; batterySaverModeActive = NO; connected = YES; charging = NO; internal = NO; powerSource = NO; poweredSoureState = Battery Power; transportType = 3; accessoryIdentifier = XXX; accessoryCategory = Watch>
~~~

Here we can see that my iPhone (Pandemonium) is at 77% of battery, is charging (since it's plugged on my MacBook), and my Apple Watch (Lut Gholein), is at 79% battery, not connected, etc.


### Where to Go From Here?

You can just explore other private frameworks that looks interesting to you and see what it can be done with them. This [Ray Wenderlich Article](https://www.raywenderlich.com/295-swizzling-in-ios-11-with-uidebugginginformationoverlay){:target="_blank"} is a really good example of something a bit more useful than looking at battery status like we just did, and the post that inspired that article came from [this one](http://ryanipete.com/blog/ios/swift/objective-c/uidebugginginformationoverlay/){:target="_blank"} which says:
> While browsing UIKit’s private headers recently, I came across a class that I hadn’t seen before - UIDebuggingInformationOverlay. A Google search didn’t turn up much info, so figured I’d write a short description of what I’ve found.

Which is a good example of how just playing around with private frameworks can lead to very interesting findings.

As always, this blog has no analytics, no ads, no annoying cookies banners, so if you want to let me know your thoughts about this article, or if you found any interesting usage of a private framework, make sure to reach me out on [Twitter](http://twitter.com/fcbunn){:target="_blank"}. 

Happy spelunking!
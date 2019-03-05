---
layout: post
title:  "I love Swift, I hate to use Swift!"
date:   2019-03-02 21:05:58 +0000
categories: jekyll update
---

> note: this post was originally posted on [Medium](https://medium.com/p/3778aeeda209/edit), since then I do think the tooling improved quite a bit and every new side project I started was using Swift, although things like LLDB are still pretty bad I feel like it's getting better. Another thing that I wanted to make it more clear is that I've been using Swift since the first version and even did the mistake of submitting to the App Store apps with Swift 1.0.

Lately I've been asked the following question quite a lot "Why are you still using Objective-C?" or "Why you're not using Swift yet?" on Slack channels, Twitter, [Podcasts](https://overcast.fm/+B8CbvZG8c), so I decided to inaugurate my Medium account with a more elaborated answer on why I'm still using Objective-C.

Disclaimer: I'm not here to say what's right or wrong, what should and should not be done, I'm just elaborating on why Swift doesn't work for **me**, **yet**.


### A Brief Introduction

Recently we hit the mark of the [10th anniversary of the iPhone SDK](https://blog.iconfactory.com/2018/03/a-lot-can-happen-in-a-decade/), which actually [made me realize](https://twitter.com/fcbunn/status/971154805342208001) that I've been working with iOS for 10 years now. At the moment the SDK was released I downloaded it and started playing with Xcode, published a couple apps and got my official iOS developer job one or two years later.

This is to say that I'm quite confortable with Objective-C, also, that I had my share of hype when new tech was available and faced the consequences of doing so, which now makes me think at least 3x before jumping on the new tech train.


### Swift Itself

The first thing to consider is Swift itself, as a language. Is it good, is it bad? Better or worst than Objective-C? These are complicated questions, and quite impossible to answer objectively since it involves a lot of personal preferences. I like it, I think the syntax is good, it's versatile and arguably easy to read (This is generally more of a burden on the developer itself than on the language). Overall I think it's a nice language, and I'd really love to use it more frequently, and here's the part where I'll start to list the reasons on why I don't.


### Scary Updates

This is becoming less and less of a problem, but Swift is a new language (2014), it's only natural that updates will come fast (and furious) with breaking changes, new syntaxes, etc. compared to Objective-C where it first appeared in 1984. Every year Swift updates broke previous code, sometimes requiring a lot of work, sometimes simple quick fixes but it was almost like a pastime of mine to read comments on Slack/Twitter with people anxious/nervous about their projects not compiling, issues with libraries that some are updated to recent Swift versions, some others are not, having to manage all that. Problems that just do not exists in the Objective-C world.

Some weeks ago I found some really old projects on my Mac (iOS 4/5), and just for fun I decided to open and try to run. To my surprise, everything worked well. Nasty textures and UI that did not age well but it was up and running. Granted, it's not a super-common use case to get a 6 years old project and run it, but on the other hand, I recently helped a friend that inherited a Swift project that was not updated in ~2 years, besides the project itself not compiling, all dependencies were also outdated, with some of them never seeing the light of a new Swift version support.

But as I wrote before, Swift is getting more and more stable and this will stop being a problem anytime soon, but to this day I still see people on Slack having issues because of Swift versions migrations. Still, if this was the only issue I'd consider Swift on a new project, unfortunately it's not.

### Swift Toolkit

Here's where my biggest reason on why not to use Swift lies. When I say "Toolkit" I'm referencing everything that works with Swift in order to have a decent dev environment: Xcode, LLDB, LLVM, Instruments, etc.

Xcode support for Swift is almost laughable, [syntax highlight doesn't work](https://twitter.com/fcbunn/status/971853272863690753), compile times are huge, Swift refactor is missing and most importantly, LLDB just doesn't work.

LLDB is a huge part of my workflow, not just to debug, but to actually write code, automate flows, write logs, etc. I wrote a [post](http://equinocios.com/ios/2017/03/08/lldb-e-seu-amigo/) (In Portuguese) about some of the things I do with LLDB, and they just don't work in Swift. With Objective-C I have lots of breakpoint actions with debugger commands, sometimes I write entire methods with LLDB expressions and then I do a transcript to actual code when I'm happy with the results, even for some kinds of logs I like to use LLDB + breakpoint actions instead of a NSLog.

Now you are probably thinking "But you can do all that in Swift" and I say "You can't", not because the feature is not there, not because LLDB doesn't exists in Swift, but because they are super buggy. A simple po command runs almost instantly on a Objective-C project, where on Swift it can easily take up to 4 seconds for it to return (on a maxed out 2015 MacBook Pro), and being slow is when it's a lucky day because more often than not, the debugger connection will just be lost and the only way I know of to fix the issue is to restart Xcode and the simulator.

I believe this is the source of a lot of complaints about Xcode in general, I see people complaining that Xcode is buggy, that this and that does not work and I just cannot relate to that, not while I'm using Objective-C.

### To Swift or not to Swift?

In conclusion, I think Swift is a wonderful language, I use it myself on my hobby projects like [macGist](https://github.com/Bunn/macGist) which is a awesome example if you want to see a Swift project by someone that doesn't know a lot of Swift, and an AppKit project by someone that doesn't know a lot of AppKit :) but every single time I open a Swift project it's a matter of minutes until I miss the Objective-C world. Not because of the language, not because I'm more productive with it, but because the toolkit just works. Some people might see past that in order to use cool Swift advantages and sexy syntax, I can't. All these issues I mentioned, language updates and toolkit are just not a problem for Objective-C, it's really hard for me to justify the change.

I really hope that this year the new dev tools will be improved and optimized for Swift, that I can use Xcode without crashing the code completion or syntax highlight, that I can run an expression on LLDB without waiting the equivalent time of a pitch drop. Until then I'll be using Objective-C for everything that I consider "mission critical". I really love Swift as a language, but Swift as a development solution is still [not quite my tempo](https://www.youtube.com/watch?v=xDAsABdkWSc).
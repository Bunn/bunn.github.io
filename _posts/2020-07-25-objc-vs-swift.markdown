---
layout: post
title: "Objective-C vs Swift, the definitive benchmark"
date: 2020-07-25 00:00:00
category: Benchmark
---

### Finally, a definitive answer

Since Swift's release people have been benchmarking ObjC vs Swift to check which one is better, a multitude of metrics from execution speed to code legibility have been done, but all of those benchmarks are inconclusive, there's always a caveat, there's always a "it depends" conclusion. NO MORE! Here I will answer which language is better for once and for all

### Process

What's the one thing that everybody uses? Arrays!
What's the one thing that everybody does with arrays? Sort them!

So here it is, I'll create a random list and sort them, which one finishes faster will be the winner and you better adopt the winner language on your project or else you'll be forever shamed for using a slow language.

### Objective-C Code

<script src="https://gist.github.com/Bunn/736297b8b127f92b7a4fa9f66cccabc1.js"></script>

### Swift Code

<script src="https://gist.github.com/Bunn/56aaf8751f4882976b5f623aa1090ecb.js"></script>

### Results

#### Objective-C

```
2020-07-25 11:29:05.106392+0100 ObjcBogo[18037:131782] List [(
    63,
    94,
    62,
    100,
    98,
    4,
    12,
    80,
    47,
    89
)]
2020-07-25 11:29:05.106827+0100 ObjcBogo[18037:131782] Start [Sat Jul 25 11:29:05 2020]
2020-07-25 11:29:17.614911+0100 ObjcBogo[18037:131782] End [Sat Jul 25 11:29:17 2020]
2020-07-25 11:29:17.615068+0100 ObjcBogo[18037:131782] Time Spent [12.50807499885559]
2020-07-25 11:29:17.615205+0100 ObjcBogo[18037:131782] List [(
    4,
    12,
    47,
    62,
    63,
    80,
    89,
    94,
    98,
    100
)]
Program ended with exit code: 0
```

#### Swift

```
[86, 22, 94, 93, 69, 9, 58, 42, 40, 38]
Start 2020-07-25 10:26:15 +0000
End 2020-07-25 10:27:38 +0000
Time Spent [82.35879898071289]
[9, 22, 38, 40, 42, 58, 69, 86, 93, 94]
Program ended with exit code: 0
```

### Conclusion

Objective-C finished in `12.50` seconds while Swift finished in `82.35`, it's pretty obvious that Objective-C is at the very least `6.5x` faster than Swift.

There you go, Objective-C is the winner, if you care at all about the performance of your apps you should drop Swift and re-implement everything in Objective-C.

This is proof that if Apple had implemented Objective-CUI instead of SwiftUI the library would render the components `6.5x` faster on the user's device. Apple doesn't care about user's experience, it only cares about Swift, which should have been called `Unhurried` or `Leisurely`

### This is a joke

I really hope you did, but if you didn't get it by now, this is a parody 🙃
I always had this stupid idea of benchmarking languages with BogoSort and since I've read some really arbitrary benchmarks of Swift vs Objective-C in the past few months I decided to publish this as a joke 😅

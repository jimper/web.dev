---
title: Fast ads matter
subhead: |
    Learn how improving ad speed can increase revenue AND makes users happy.
date: 2019-10-09
authors:
  - jimper
description: |
    Understand the value of fast ads and how to think about ad speed.
tags:
  - post
  - performance
  - fast
  - ads
---

If you're like most publishers on the web, your business offers a simple value exchange: you provide content that users find valuable, and in the process present them with relevant ads to generate revenue. But if those ads slow down the content, are you really upholding your end of the bargain?

This post explains how fast ads benefit everyone, and how to start investigating and improving ad speed on your sites.

## Why do fast ads matter?

### Fast ads improve the user experience

Users come to your site for the content, not for the ads—they usually want to get some value as quickly as possible, with minimal interruption. If your site helps users do that well, they tend to return more often. While ads may be necessary for your business, they create a tension with the user's purpose.

The browser has limited resources to work with—memory, CPU, and network bandwidth. The more of these resources your ads consume, the longer it takes for your page to become visually complete and [interactive](https://web.dev/interactive/). This can be a drag on user experience metrics like [session length](https://en.wikipedia.org/wiki/Session_(web_analytics)) and [bounce rate](https://en.wikipedia.org/wiki/Bounce_rate). You can improve these metrics by serving the most lightweight ads possible and loading them at the right time (which is not always right away).

For many e-commerce publishers, display ads are a secondary source of revenue. If you're one of these publishers, you know that any ads you place on the page have some negative impact on your primary business metrics (sales, subscriptions, and more). Fast ads, by getting out of the page's way, give your primary business metrics a boost as well.

{% Aside %}
When asked about their reasons for installing ad blockers, [many users cited "interruption" and "speed"](https://pagefair.com/blog/2017/adblockreport/) as primary motivators. Since fast ads result in improved user experience metrics, a focus on improving ad speed may decrease the incentive for users to install ad blockers.
{% endAside %}

### Fast ads make you more money

Another way to think about this topic is from an advertiser's point of view. The sooner an ad appears on the page, the longer it will be visible on the screen, meaning it's more likely to be seen and interacted with. As views and interactions increase, so does the value of your ad slots in the eyes of advertisers.

Conversely, [impressions](https://en.wikipedia.org/wiki/Impression_(online_media)) and [viewable impressions](https://en.wikipedia.org/wiki/Viewable_Impression) decrease the longer an ad takes to appear on the page. To provide a sense of the magnitude of this problem, the charts below show aggregated data from a 2017 experiment where 100ms to 1s of delay (latency) was injected before each ad response to the Google Publisher Tag in multi-request mode.

<figure class="w-figure w-figure--center">
  <img src="https://cdn.glitch.com/d6637725-0d96-4b4b-b49c-dfe21e471307%2Fad-latency-injected-vs-impressions-change.png?v=1571759265424" alt="Chart showing latency injected vs. impressions change">
  <figcaption class="w-figcaption">
    With 1s of added delay, impressions decreased by 1.1% for mobile traffic and 1.9% for desktop traffic. The dotted lines are extrapolations to visualize how improving ad speed could increase impressions.
  </figcaption>
</figure>

<figure class="w-figure w-figure--center">
  <img src="https://cdn.glitch.com/d6637725-0d96-4b4b-b49c-dfe21e471307%2Fad-latency-injected-vs-viewability-rate-change.png?v=1571759273082" alt="Chart showing latency injected vs. viewability rate change">
  <figcaption class="w-figcaption">
    With 1s of added delay, viewability rates decreased by 3.6% for mobile traffic and 2.9% for desktop traffic. The dotted lines are extrapolations to visualize how improving ad speed could increase impressions.
  </figcaption>
</figure>

In the examples above, the median time for the first ad on a site to start rendering was 1.9s, and above 4.4s for 1 in 5 users (across all sites using the Google Publisher Tag). Subsequent ads start rendering later, and the timings for more complex sites tend to be higher. So on most sites, there is plenty of room for ad speed improvements.

## A framework for thinking about ad speed

Modern websites tend to have complex and diverse ad serving setups, which means there's no one-size-fits-all method of making ads fast. Instead, the following sections give you a framework for thinking about ad speed. Some points are specific to Google Ad Manager, but the principals apply even if you're using a different ad server.

### Know why you want to improve ad speed

Before you start working to improve ad speed, you should be clear on what your goals are. Is it to improve the user experience? To increase viewability? Both?

Whatever your specific goals are, it's important to identify the metrics you can use to measure and track progress towards them over time. Having the right metrics in place allows you to:

*   Know if the changes you're making are moving you in the right direction.
*   Run experiments, such as A/B tests, to evaluate the effectiveness of specific changes.

Once you've decided on the metrics that make sense for you, be sure to configure reporting so you can easily keep track of them. A dashboard you can check periodically or scheduled reports sent to you by email work well for that.

### Know your inventory and dependencies

To identify opportunities for improving ad speed, you first need to understand the types of inventory your site supports and the technical dependencies of each.

As an example, suppose a site supports the following inventory types:
* Desktop leaderboard
* Mobile banner

To load and display ads, the example site uses the following:
* A consent management platform
* Audience scripts
* Header bidding scripts
* A rendering framework

First, create a flowchart for each inventory type to visualize how the various dependencies interact in order to load and display an ad. Desktop leaderboard inventory may look like this:

![An example workflow for the desktop leaderboard inventory type.](./desktop-leaderboard.svg)

While a more complex inventory type, such as mobile banner, may look like this:

![An example workflow for the mobile banner inventory type.](./mobile-banner.svg)

Then, use this information to create a simple table like the one below, which maps each inventory type to its dependencies in an easily digestible format.

| Type of inventory   | Consent management platform | Audience script    | Header bidding script | Rendering framework |
|:--------------------|:---------------------------:|:------------------:|:---------------------:|:-------------------:|
| Desktop leaderboard |  &#x2714;                   | &#x2714; (X)       | &#x2714; (A)          | -                   |
| Mobile banner       |  &#x2714;                   | &#x2714; (X and Y) | &#x2714; (A and B)    | &#x2714;            |

Creating an overview of inventory types and dependencies like this helps to identify critical paths and areas for optimization. For example, you may find that some dependencies are included unnecessarily and can be removed for a quick speed improvement. This information is especially useful to have when analyzing ad loading times.

### Know where you want to improve

A good way to approach improving ad speed is to focus on reducing the amount of time it takes for the first ad on your page to load. This time can be broken down into three main intervals:

<dl>
    <dt>Time to load ad libraries</dt>
    <dd>The time it takes to load all ad libraries necessary to issue the first ad request. May be improved by removing or delaying the loading of scripts that are not related to making ad requests.</dd>
    <dt>Time to first ad request</dt>
    <dd>The time elapsed from ad library load to the first ad request being made. May be improved by parallelizing header bidding requests and avoiding tasks that <a href="https://web.dev/mainthread-work-breakdown/">block the main thread</a>.</dd>
    <dt>Time to render first ad</dt>
    <dd>The time elapsed from the first ad request being made to the first ad being rendered. May be improved by reducing ad complexity and creative file size.</dd>
</dl>

Before you start making any changes, you need to decide which of these metrics to focus on. While the ultimate goal is to minimize them all, the relative importance of improving each (and the methods you use to do so) will greatly depend on your specific setup.

You can use a tool like [Publisher Ads Audits for Lighthouse](https://developers.google.com/publisher-ads-audits) to help you analyze your site, identify bottlenecks, and make an informed decision about what to focus your efforts on.

## Next steps

Now that you understand the importance of ad speed and have a framework for thinking about it, it's time to go out and make your ads fast. First, identify areas for improvement in your sites. Then, learn how to [identify ad-related requests]() in order to start troubleshooting and optimizing their performance. Finally, consider authoring your ads in [AMP](https://amp.dev/about/ads/), a format that reliably produces fast ads.

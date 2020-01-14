---
title: Serving a high quality user experience, without being a server-side expert 
date: 2020-01-14 12:00:00 -07:00
image: /images/writing/2020-01-14-serving-a-high-quality-user-experience/2048-wide/vote.png
---

Recently an organization asked if I would help them create a web application for a voting contest. The contest would involve a showcase of organizations working to improve Los Angeles that can be voted for by anyone who lives in the city. The winners would collectively receive one million dollars in support. They wanted to host everything on the web and were expecting tens of thousands of voters to visit the web site.

It felt like a huge undertaking with a lot at stake–and that deserved a team of expert designers and engineers. A part of me wanted to tell them, “I’m not qualified to do all of this for you”, but I really wanted to work on the project–so the words that actually came out were, “Yes, of course!”

I had been part of teams working on projects like this one in the past, filling the role of user experience engineer. I knew that I could write high quality HTML, CSS and JavaScript to make a user interface for them. And I had been in the room with experienced server side engineers who were setting up things like servers and databases. Thinking about the qualities of a web application that I had observed those engineers putting effort into, I felt that I should focus on _security_, _scalability_ and _robustness_.

I had recently learned about using GitHub pages and Jekyll to make a static web site or application that, by its very nature, would have these attributes.

1. **Security**: A folder of static HTML files served directly on the web is going to be almost unhackable. And the source code will be safely stored in a version control system, behind GitHub’s two-factor authentication.
2. **Scalability**: HTML files on a CDN are going to be lighting fast for lots of simultaneous visitors.
3. **Robustness**: HTML files don’t have moving parts and browsers are super-forgiving when it comes to interpreting HTML, so there’s almost nothing that can break and make the site unavailable.

I had also learned that it’s possible to extend a static web site with third-party services, to add features that may be missing–such as having the ability to accept and save data from visitors–for things like comments on a post and in my case, voting forms.

The basic pieces that I felt the voting application needed were:

1. Form that users can use to vote for their favorite organizations
2. The ability to save voting forms in a database, so they can be retrieved and counted
3. A way to for users to authenticate themselves, to keep the voting fair

The static user interface would be core of the application, showcasing the organizations and providing a voting form.

[Netlify’s forms](https://www.netlify.com/products/forms/) feature provided a way to save the voting data. It worked really well and was super easy to set up!

```html
<form name="vote" data-netlify="true">…</form>
```

[Auth0’s passwordless sign in](https://auth0.com/passwordless) service provided a way to authenticate the voters. They have an API that can be accessed with JavaScript, so it worked great with a static site.

```javascript
const webAuth = new auth0.WebAuth({
  …
  redirectUri: `${window.location.origin}/vote/authenticated/`
});

const form = document.querySelector('form[name="vote"]')

form.addEventListener('submit', function(e) {
  webAuth.passwordlessStart();
})
```

Auth0 provides easy integration with other services like Twilio and SendGrid for sending text messages and emails that visitors can use to [authenticate themselves, without needing to create a password](https://auth0.com/passwordless).

<figure markdown="1">
[![Voting form](/images/writing/2020-01-14-serving-a-high-quality-user-experience/2048-wide/phone.png)](https://beta-challenge.la2050.org/vote/form/)
</figure>

[Cloudflare](https://www.cloudflare.com/) provided a CDN to keep the web site fast for everyone and essentially reduced bandwidth costs for the project to just $20 per month. Their service was also useful for, things like true 301 and 302 redirects, which aren’t generally available for a static web site. And their service provides free HTTPS, which keeps the web site secure and private for visitors. Cloudflare also provides protection from DoS and bad robots with things like [automatic CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/). This turned out to be useful in terms of keeping the voting fair and protected from automatic form submissions.

The combination of GitHub and Netlify also made it possible to set up multiple staging web sites for each phase of the project, automatically deployed from a few core Git branches.

```
Build command
    jekyll build --config _config.yml,_config/staging.yml
Publish directory
    _site/
```

<figure markdown="1">
![Deploy settings on Netlify](/images/writing/2020-01-14-serving-a-high-quality-user-experience/2048-wide/netlify.png)
</figure>

Discovering these services and putting them to use for each aspect of the project felt really empowering. And it left me feeling like it’s never been a better time to be designing and building on the web, with so many high quality tools and materials to work with. If there’s anything that you take away from this article, I hope that it will be–when you’re faced with a seemingly impossible project, you’ll tell yourself “I can do it!” 🙂

You can learn more about using static site generators to make scalable web products, from [episode 54 of the “The Web Ahead” podcast](https://thewebahead.net/54).

If you’d like to see more example code, here’s the [LA2050 project on GitHub](https://github.com/la2050/challenge), and a [case study](https://tobbi.co/la2050/).

<div style="margin-top: 3em"></div>

_This article is also published on [Dev](https://dev.to/jimthoburn/serving-a-high-quality-user-experience-without-being-a-server-side-expert-4gif)_.


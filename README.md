<!-- PROJECT LOGO -->
<br />
<div align="center">
<br />
  <a href="https://github.com/mashwishi/kohee">
    <img src="https://kohee.app/kohee_cup.webp" alt="Logo" width="300">
  </a>
<br /><br />
  <p align="center">
    Creating an easiest way to share your social media links!
    <br />
    <a href="https://kohee.app/"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://kohee.app/">Production</a>
    ·
    <a href="https://dev.kohee.app/">Staging</a>
    ·
    <a href="https://github.com/mashwishi/kohee/issues">Report Bug</a>
    ·
    <a href="https://github.com/mashwishi/kohee/issues">Request Feature</a>
  </p>
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    <li><a href="#built-with">Built With</a></li>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->

## Getting Started

This is the instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mashwishi/kohee.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your ENV in `.env` or `.env.local`

   ```js
   CLERK_JWT_KEY = "";
   CLERK_API_KEY = "";
   NEXT_PUBLIC_CLERK_FRONTEND_API = "";
   HASURA_ADMIN_SECRET = "";

   ENDPOINT_KEY_PROD = "";
   ENDPOINT_KEY_LOCAL = "";

   NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT = "";
   NEXT_PUBLIC_HASURA_REST_API = "";
   NEXT_PUBLIC_HOSTNAME = "https://<yourdomainhere>";

   NEXT_PUBLIC_GOOGLEADS_CLIENT = IMGUR_CLIENT_ID = "";
   IMGUR_CLIENT_SECRET = "";

   GOOGLE_ANALYTICS_TRACKING_ID = "UA-";

   GEOAPIFY_URL = "";
   GEOAPIFY_KEY = "";
   ```

   Universal Analytics will no longer process new data in standard properties beginning July 1, 2023.
   The `react-ga` is now deprecated (12/18/2022) since it is still not July 1, 2023 I will keep this configuration and wait for `react-ga` updates while waiting for an alternative solution.

4. Run on local using `npm run dev` or on prod using `npm run`

### Built With

This section list of major frameworks/libraries we used to our your project.

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- [![Clerk][clerk]][clerk-url]
- [![Tailwind][tailwind]][tailwind-url]
- [![Hasura][hasura]][hasura-url]
- [![DaisyUI][daisyui]][daisyui-url]

<!-- ROADMAP -->

## Roadmap

- [x] Create a repo
- [x] Deploy live/staging with vercel
- [x] Kohee Landing page
- [x] User Social Media Authentication
- [x] User Security Settings
- [x] User Links Settings
- [x] User Customizations Settings
- [x] Sharable profiles
- [x] Follow System
- [x] Kohee user dashboard
- [x] User Discovery
- [x] API Webhooks and Endpoints
- [x] User Followers and Visits
- [x] Front-End Enhancement
- [x] User Analytics
- [x] Progressive Website Application Feature
- [x] QR Generator
- [ ] QR Scanner
- [ ] Ads to support the project
- [ ] Referral Program to earn more feature
- [ ] Release on Google Play Store for Android
- [ ] Release on App Store Store for iOS

See the [open issues](https://github.com/mashwishi/kohee/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GNU License. See `LICENSE.txt` for more information.

<!-- Contributors / Collaborators -->

## Contributors / Collaborators

[@Mashwishi](https://github.com/Mashwishi), [@Exarus](https://github.com/Exaruss), [@Aspect](https://github.com/aspectdev-ph)

<!-- Partners -->

## Partners

<!-- Sponsors -->

## Sponsors

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/mashwishi/kohee.svg?style=for-the-badge
[contributors-url]: https://github.com/mashwishi/kohee/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mashwishi/kohee.svg?style=for-the-badge
[forks-url]: https://github.com/mashwishi/kohee/network/members
[stars-shield]: https://img.shields.io/github/stars/mashwishi/kohee.svg?style=for-the-badge
[stars-url]: https://github.com/mashwishi/kohee/stargazers
[issues-shield]: https://img.shields.io/github/issues/mashwishi/kohee.svg?style=for-the-badge
[issues-url]: https://github.com/mashwishi/kohee/issues
[license-shield]: https://img.shields.io/github/license/mashwishi/kohee.svg?style=for-the-badge
[license-url]: https://github.com/mashwishi/kohee/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[clerk]: https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=Clerk&logoColor=white
[clerk-url]: https://clerk.dev/
[hasura]: https://img.shields.io/badge/Hasura-1EB4D4?style=for-the-badge&logo=Hasura&logoColor=white
[hasura-url]: https://clerk.dev/
[tailwind]: https://img.shields.io/badge/Tailwind-0EA5E9?style=for-the-badge&logo=TailwindCSS&logoColor=white
[tailwind-url]: https://hasura.io/
[daisyui]: https://img.shields.io/badge/DaisyUI-F000B8?style=for-the-badge&logo=DaisyUI&logoColor=white
[daisyui-url]: https://daisyui.com/

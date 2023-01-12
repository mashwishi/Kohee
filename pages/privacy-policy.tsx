import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {

  useEffect(() => {
    ReactGA.pageview('Privacy Policy')
  }, [])

  
    return (
      <>
          <HeadMeta 
          title_ext="Privacy Policy" 
          description="Our Privacy Policy" 
          og_image={''}
          og_url={''}
          />

        <div className="cl-component cl-user-profile">
          <div className="cl-main">
              <div className="cl-themed-card">
                  <div className="items-center justify-center" >
                      <h1 className="neiTtIc1DzU_PrekjGtm">Privacy Policy</h1>
                      <p className="text-xs text-gray-600 mt-2">Updated on December 22, 2022</p>
                  </div>
                  <div className="cl-titled-card-list">
                    <div className="w-full mt-10 px-8">

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Privacy Policy for Kohee</p>
                      <p className="text-gray-700 text-base">
                      At Kohee, accessible from kohee.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Kohee and how we use it.
                      </p>
                      <p className="text-gray-700 text-base">
                      If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:support@kohee.app" className="text-orange-900 hover:text-orange-400"><strong>support@kohee.app</strong></a>.
                      </p>

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Log Files</p>
                      <p className="text-gray-700 text-base">
                      Kohee follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
                      </p>

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Cookies and Web Beacons</p>
                      <p className="text-gray-700 text-base">
                      Like any other website, Kohee uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
                      </p>

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Google DoubleClick DART Cookie</p>
                      <p className="text-gray-700 text-base">
                      Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" className="text-orange-900 hover:text-orange-400" rel="noreferrer"><strong>https://policies.google.com/technologies/ads</strong></a>
                      </p>

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Privacy Policies</p>
                      <p className="text-gray-700 text-base">
                      You may consult this list to find the Privacy Policy for each of the advertising partners of Kohee.
                      </p>
                      <p className="text-gray-700 text-base">
                      Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Kohee, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                      </p>
                      <p className="text-gray-700 text-base">
                      Note that Kohee has no access to or control over these cookies that are used by third-party advertisers.
                      </p>

                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Third Party Privacy Policies</p>
                      <p className="text-gray-700 text-base">
                        Kohee&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                      </p>
                      <p className="text-gray-700 text-base">
                        You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites. What Are Cookies?
                    </p>

                    <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Children&apos;s Information</p>
                    <p className="text-gray-700 text-base">
                        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                    </p>
                    <p className="text-gray-700 text-base">
                        Kohee does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </p>

                    <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Online Privacy Policy Only
                    </p>
                    <p className="text-gray-700 text-base">
                        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Kohee. This policy is not applicable to any information collected offline or via channels other than this website.
                    </p>

                    <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Consent</p>
                    <p className="text-gray-700 text-base">
                        By using our website, you hereby consent to our <Link href="/privacy-policy"><strong className="cursor-pointer">Privacy Policy</strong></Link> and agree to its <Link href="/terms-and-condition"><strong className="cursor-pointer">Terms and Conditions</strong></Link>.
                    </p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        
      </>
    );
  };
  
  export default PrivacyPolicy;
  
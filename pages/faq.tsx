import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";

const FAQ = () => {

  useEffect(() => {
    ReactGA.pageview('FAQ')
  }, [])

  
    return (
      <>
          <HeadMeta 
          title_ext="Frequently Asked Questions" 
          description="Have some questions?" 
          og_image={''}
          og_url={''}
          />

        {/* FAQ */}
        <section className="px-4 py-14 mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
                <div>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What is Kohee?</h5>
                <p>
                Kohee is a tool that helps you keep all your online links in one place. You can use a personalized link to share everything you want, and add it to your social media bios, email signatures, business cards, and anywhere else people might find you.
                </p>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What is Kohee used for?</h5>
                <p>
                Kohee is a tool that lets you share multiple links from your social media bios and other online platforms such as email signatures, video descriptions, show notes, live streams, webinars, and even offline using QR codes. It helps connect people to your online identity.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Why do I need a Kohee?</h5>
                <p>
                Kohee is a tool that helps you share all your links in one place. It makes it easy for your audience to find everything you have to offer, everything you do and everything you care about. You can add it to your social media bios, use it in your email signatures and even display it as a QR code to connect with your offline audience. Kohee is easy to use and accessible to everyone.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Is Kohee safe to use on all of my social media profiles?</h5>
                <p>
                Kohee is a widely used tool among social media platforms. Many users of Facebook, Instagram, and TikTok have found it useful for their accounts. As a link-in-bio tool, it generates a personalized URL which can be added to social media bios, email signatures, and other online platforms. It condenses multiple links into one, making it easier for your followers, visitors, and customers to find everything the&apos;re looking for in one place. Additionally, it can also be displayed as a QR code to connect with offline audiences, making it a safe and familiar link for audiences to click on.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Is Kohee free for open-source?</h5>
                <p>Yes. No strings attached. Free forever.</p>

                </div>
                <div>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">How can I drive more traffic to and through my Kohee?</h5>
                <p>
                By sharing your Kohee link on all your social media platforms, you can ensure that your most important content is easily accessible to all your followers. Additionally, using QR codes can generate online traffic from offline places and drive people to your links. Once visitors land on your Kohee, the analytics provided will help you understand where they&apos;re coming from and what they&apos;re clicking on. This way, you can quickly identify what&apos;s working and what&apos;s not, and make adjustments on the fly with different link placement, prioritized links, subheadings, animation, and other features to direct traffic to your desired locations.
                </p>
                
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">How many links should I have on my Kohee?</h5>
                <p>
                The number of links on your Kohee depends on what you want to achieve. If your goal is to increase clicks and conversions, it&apos;s best to have 3-7 links on your Kohee at one time, as this has been the most effective approach for successful creators. Having too many options for visitors can slow down their decision-making process.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Do I need a website to use Kohee?</h5>
                <p>
                No, you don&apos;t need a website to use Kohee. Kohee can serve as your personal mini-website where you can share, sell, and grow your brand without the need for time and effort to build and maintain a traditional website. It allows you to quickly create a design that reflects your personality and brand with no previous knowledge or experience required. Even if you already have a website, you can still add it to your Kohee.
                </p>
                
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Where can I download the Kohee app?</h5>
                <p>
                Our app is currently under development and we are working hard to bring you the best possible experience. We appreciate your patience and can&apos;t wait for you to try it out!
                </p>
                </div>
            </div>
        </section>
        
      </>
    );
  };
  
  export default FAQ;
  
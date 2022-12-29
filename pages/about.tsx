import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";

const About = () => {

  useEffect(() => {
    ReactGA.pageview('About')
  }, [])

    return (
      <>
          <HeadMeta 
          title_ext="About" 
          description="Kohee App > Learn more about Kohee" 
          og_image={''}
          og_url={''}
          />

        <div className="cl-component cl-user-profile">
          <div className="cl-main">
              <div className="cl-themed-card">
                  <div className="items-center justify-center" >
                      <h1 className="neiTtIc1DzU_PrekjGtm">About Us</h1>
                      <p className="text-xs text-gray-600 mt-2">Updated on December 22, 2022</p>
                  </div>
                  <div className="cl-titled-card-list">
                    <div className="w-full mt-10 px-8">
                      <p className="text-xl font-semibold text-gray-800 leading-tight mb-6">Welcome to Kohee!</p>
                      <p className="text-gray-700 text-base">
                        Kohee is a social media reference platform that was developed by Mathew Bella and Michael Denisa in Cavite, Philippines. Our website is built using the latest technologies, including React and NextJS, and hosted on the Vercel platform. We use Clerk.dev for authentication to ensure the security of our users&apos; information. Kohee is a freemium service, offering both free and premium features to our users.
                      </p>
                      <p className="text-gray-700 text-base mt-4">
                        At Kohee, we strive to provide our users with a seamless and enjoyable experience while they browse and discover new social media content. If you have any questions or need support, please don&apos;t hesitate to contact us at <a href="mailto:support@kohee.app" className="text-orange-900 hover:text-orange-400"><strong>support@kohee.app</strong></a>.
                      </p>
                      <p className="text-gray-700 text-base mt-4">
                        Thank you for choosing Kohee as your go-to destination for social media reference.
                      </p>
                    </div>
                  </div>
              </div>
          </div>
        </div>

      </>
    );
  };
  
  export default About;
  
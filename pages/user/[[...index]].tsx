import {SignedIn, SignedOut, UserProfile, RedirectToSignIn} from "@clerk/nextjs";

const UserProfilePage = () => { 
    return (
        <>
            <SignedIn>
                <UserProfile path="/user" hideNavigation routing="path" />;
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};





export default UserProfilePage;

import UserInfo from '@/features/profile/components/UserInfo';
import UserSavedTitles from '@/features/profile/components/UserSavedTitles';
import getUserInfo from '@/utils/fetchUser';
import getToken from '@/utils/getToken';
import { retrieveSavedContent } from '@/utils/saveDeleteRetrieveContent';

async function page() {
    const accessToken = await getToken();
    const [savedTitles, userInfo] = await Promise.all([
        retrieveSavedContent(accessToken),
        getUserInfo(),
    ]);

    return (
        <div className="pt-8 pb-4 space-y-8 md:space-y-20">
            <UserInfo email={userInfo?.email} username={userInfo?.username} />
            <UserSavedTitles storedTitles={savedTitles?.data} />
        </div>
    );
}

export default page;

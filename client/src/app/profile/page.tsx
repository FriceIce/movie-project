import UserInfo from '@/features/profile/components/UserInfo';
import UserSavedTitles from '@/features/profile/components/UserSavedTitles';
import React from 'react';

function page() {
    return (
        <div className="mt-4">
            <UserInfo info={{ email: 'Fabian.Jackson@gmail.com', username: 'Fabian Jackson' }} />
            <UserSavedTitles />
        </div>
    );
}

export default page;

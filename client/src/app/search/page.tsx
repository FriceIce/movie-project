import SearchContext from '@/features/search/SearchContext';
import ContentList from '@/features/search/container/ContentList';
import SearchContainer from '@/features/search/container/SearchContainer';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

function page() {
    return (
        <SearchContext>
            <div className="h-max pb-4">
                <section className="sticky inset-0 space-y-4 bg-custom-black py-4">
                    <ArrowLeftIcon className="size-7 ml-4"></ArrowLeftIcon>
                    <SearchContainer />
                </section>

                <section className="flex flex-col gap-3 h-full ">
                    <h1 className="font-bold text-lg px-3">Recommended series and movies</h1>
                    <ContentList />
                </section>
            </div>
        </SearchContext>
    );
}

export default page;

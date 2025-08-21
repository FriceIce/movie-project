import ArrowLeft from '@/features/search (mobile)/components/ArrowLeftIcon';
import ContentList from '@/features/search (mobile)/container/ContentList';
import SearchContainer from '@/features/search (mobile)/container/SearchContainer';

function page() {
    return (
        <div className="h-max pb-4">
            <section className="sticky inset-0 space-y-4 bg-custom-black py-4">
                <ArrowLeft />
                <SearchContainer />
            </section>

            <section className="flex flex-col gap-3 h-full ">
                <ContentList />
            </section>
        </div>
    );
}

export default page;

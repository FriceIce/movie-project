import Button from '@/components/Button';

export default function Landing() {
    const mobileHostName = process.env.MOBILE_HOSTNAME as string;
    return (
        <>
            <div>Landing Page</div>
            <Button mobileHostName={mobileHostName} />
        </>
    );
}

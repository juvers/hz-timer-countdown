import App from './App';
import Bucket from './buckets/bucket';

export default function Wrapper() {
    return (
        <>
            Inside Wrapper
            <hr />
            <App />
            <Bucket />
        </>
    )
}
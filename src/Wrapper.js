import App from './App';
import Bucket from './buckets/bucket';
import Container from "./components/Container/Container";
import Typography from "./components/Typography/Typography";

export default function Wrapper() {
    return (
        <>
            <Container>
                <Typography>
                    Inside Parent component
                </Typography>

            </Container>
            <hr />
            <App />
            <hr />
            <Bucket />
        </>
    )
}
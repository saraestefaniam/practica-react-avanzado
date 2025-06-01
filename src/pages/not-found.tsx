import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default NotFoundPage;
export async function loader() {
    return [{ name: "hello" }];
}

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>Hello</h1>
                <nav>
                    <ul>
                        <li>
                            <a href={`/phonetic-learning/practice`}>Practice</a>
                        </li>
                        <li>
                            <a href={`/phonetic-learning/learn`}>learn</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}
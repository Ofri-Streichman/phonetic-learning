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
                            <a href={`/pracice`}>pracice</a>
                        </li>
                        <li>
                            <a href={`/learn`}>learn</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}
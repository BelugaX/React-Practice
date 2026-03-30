import React, { useState, useEffect } from 'react';

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const postsPerPage = 10;

    useEffect(() => {
        // Fetch posts for the current page
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    // Pagination logic
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);


    return (
        <div className="pagination">
            <h1>Pagination Example</h1>
            {/* list */}
            <ul style={{ padding: '0' }}>
                {currentPosts.map(post => (
                    <li key={post.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
                        <strong>{post.title}</strong>
                    </li>
                ))}
            </ul>

            {/* pagination buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Prev Button */}
                <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    style={{ margin: '0 5px' }}
                >
                    ⏮️
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            margin: '0 5px',
                            fontWeight: currentPage === index + 1 ? "bold" : "normal",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 5px' }}
                >
                    ⏭️
                </button>
            </div>
        </div>
    );
}
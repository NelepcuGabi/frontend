import React, { useState, useEffect } from 'react';

function Comments({ projectId, userId }) {
    const [comments, setComments] = useState([]); // Initialize with an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${projectId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments. Status: ' + response.status);
                }
                const data = await response.json();
                
                // Filter comments based on userId
                const filteredComments = data.filter(comment => comment.userId === userId);
                setComments(filteredComments);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments();
    }, [projectId, userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p><strong>{comment.userName}</strong> ({comment.email})</p>
                        <p>{comment.content}</p>
                        <p>{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Comments;

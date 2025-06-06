import { Link, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { deletePost, editPost } from "~/lib/actions/post.action"
import { Post } from "~/lib/types"

interface PostFormProps {
    post: Post
}

const PostForm = ({ post }: PostFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        if (!title || !content) {
            setError("Both title and content are required");
            return;
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);


            const result = await editPost({
                data: {
                    title,
                    content,
                    id: post.id
                }
            });

            if (!result) {
                throw new Error("Failed to edit post")
            }

            router.invalidate()
        } catch (error) {
            console.error("Failed to edit post:", error);
            setError("Failed to edit post. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIsEditing(false);
        }
    };

    const handleDelete = async (postId: string | undefined) => {
        if (!postId) return;
        const result = confirm("Are you sure you want to delete this post?")
        if (!result) return;
        try {
            await deletePost({ data: postId });
            router.invalidate();
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {
                !isEditing ? <div>
                    <Link
                        to="/posts/$postId"
                        params={{
                            postId: post.id ?? '#'
                        }}
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post.title.substring(0, 20)}
                        </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {post.content.substring(0, 50)}
                    </p>
                </div> : <form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto">

                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                            placeholder="Title..."
                            required={true}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Content
                        </label>
                        <textarea
                            rows={4}
                            cols={4}
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                            required={true}
                            placeholder="Content..."
                        />
                    </div>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {
                            isSubmitting && (
                                <div className='absolute left-1/3 rounded-full h-5 w-5 border-white border-2 border-b-0 animate-spin' />
                            )
                        }
                        Save
                    </button>
                </form>
            }
            <div className="absolute top-2 right-2 flex items-center gap-4 p-2">
                {!isEditing ? <>
                    <button className="group" onClick={handleToggleEdit}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 group-hover:text-blue-500"
                        >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                        </svg>
                    </button>
                    <button className="group" onClick={() => handleDelete(post.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 group-hover:text-rose-500"
                        >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1={10} x2={10} y1={11} y2={17} />
                            <line x1={14} x2={14} y1={11} y2={17} />
                        </svg>

                    </button>
                </> : <button className="group" onClick={handleToggleEdit}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 group-hover:text-rose-500"
                    >
                        <circle cx={12} cy={12} r={10} />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                    </svg>
                </button>

                }
            </div>

        </div>
    )

}

export default PostForm
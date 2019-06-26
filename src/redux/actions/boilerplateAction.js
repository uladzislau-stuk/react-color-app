function addTodoWithoutCheck(text) {
	return {
		type: 'ADD_TODO',
		text
	}
}

export function addTodo(text) {
	// This form is allowed by Redux Thunk middleware
	// described below in “Async Action Creators” section.
	return function(dispatch, getState) {
		if (getState().todos.length === 3) {
			// Exit early
			return
		}
		dispatch(addTodoWithoutCheck(text))
	}
}

export function loadPosts(userId) {
	// Interpreted by the thunk middleware:
	return function (dispatch, getState) {
		const {posts} = getState()
		if (posts[userId]) {
			// There is cached data! Don't do anything.
			return
		}

		dispatch({
			type: 'LOAD_POSTS_REQUEST',
			userId
		})

		// Dispatch vanilla actions asynchronously
		fetch(`http://myapi.com/users/${userId}/posts`).then(
			response =>
				dispatch({
					type: 'LOAD_POSTS_SUCCESS',
					userId,
					response
				}),
			error =>
				dispatch({
					type: 'LOAD_POSTS_FAILURE',
					userId,
					error
				})
		)
	}
}

/*
Benefits
- Action creators let you decouple additional logic around dispatching an action, from the actual components emitting those actions
- Thunk middleware is just one example of middleware. Middleware is not about “letting you dispatch functions”.
It's about letting you dispatch anything that the particular middleware you use knows how to handle.
 */

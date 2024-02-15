export const removeUser = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if required
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        // Return data if needed
        // const data = await response.json();
        // return data;
    } catch (error) {
        throw error; // Throw error for error handling in the component
    }
};
export const handleUpdate = async (id, user) => {
    console.log(user)
    console.log(id)
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: user
        });
        console.log(user)
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const createUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            // Handle error response from server
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create user');
        }

        const responseData = await response.json();
        return responseData; // Assuming the response contains the created user's ID
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; // Rethrow the error to handle it in the calling code
    }
};


export const createProductSend = async (product) => {
    const category = product.title
    try {
        const response = await fetch(`http://localhost:3000/api/products/${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            // Handle error response from server
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create user');
        }

        const responseData = await response.json();
        return responseData; // Assuming the response contains the created user's ID
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

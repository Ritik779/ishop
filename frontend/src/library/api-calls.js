import { axiosInstance } from "./helper"

// Category Code

const CategoryData = async () => {
    return await axiosInstance.get("/category")
        .then(
            (response) => {
                return response.data.categories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const GetCategoryByID = async (id) => {
    return await axiosInstance.get(`/category/${id}`)
        .then(
            (response) => {
                return response.data.category
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const CategoryTrash = async () => {
    return await axiosInstance.get("/category/get-trashed")
        .then(
            (response) => {
                return response.data.categories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

// Color code

const ColorData = async () => {
    return await axiosInstance.get("/color")
        .then(
            (response) => {
                return response.data.colors
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const GetColorByID = async (id) => {
    return await axiosInstance.get(`/color/${id}`)
        .then(
            (response) => {
                return response.data.color
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const ColorTrash = async () => {
    return await axiosInstance.get("/color/get-trashed")
        .then(
            (response) => {
                return response.data.colors
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

// Product code

const ProductData = async (catagory = null, range = null, color = null, page = null, limit = null, sortByName = null, search = null) => {
    const searchQuery = new URLSearchParams()
    if (catagory != null) {
        searchQuery.append("category", catagory)
    }
    if (range != null) {
        if (range.min < range.max) {
            searchQuery.append("min", range.min)
            searchQuery.append("max", range.max)
        }
    }
    if (color != null) {
        searchQuery.append("color", color)
    }
    if (page != null) {
        searchQuery.append("page", page)
    }
    if (limit != null) {
        searchQuery.append("limit", limit)
    }
    if (sortByName != null) {
        searchQuery.append("sortByName", sortByName);
    }
    if (search != null) {
        searchQuery.append("search", search)
    }
    return await axiosInstance.get(`/product?${searchQuery.toString()}`)
        .then(
            (response) => {
                return response.data.products
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getProductByID = async (id) => {
    return await axiosInstance.get(`/product/${id}`)
        .then(
            (response) => {
                return response.data.product
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const ProductTrash = async () => {
    return await axiosInstance.get("/product/get-trashed")
        .then(
            (response) => {
                return response.data.products
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

// accessories code

const AccessoryData = async () => {
    return await axiosInstance.get("/accessories")
        .then(
            (response) => {
                return response.data.accessories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getAccessoryByID = async (id) => {
    return await axiosInstance.get(`/accessories/${id}`)
        .then(
            (response) => {
                return response.data.accessory
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const AccessoryTrash = async () => {
    return await axiosInstance.get("/accessories/get-trashed")
        .then(
            (response) => {
                return response.data.accessories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

// user code

const getUserData = async () => {
    return await axiosInstance.get("/user")
        .then(
            (response) => {
                return response.data.users
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

// const GetUserId = async (id) => {
//     return await axiosInstance.get(`/user/${id}`)
//         .then(
//             (response) => {
//                 return response.data.accessory
//             }
//         ).catch(
//             (error) => {
//                 return []
//             }
//         )
// }

// const UserTrash = async () => {
//     return await axiosInstance.get("/user/get-trashed")
//         .then(
//             (response) => {
//                 return response.data.accessories
//             }
//         ).catch(
//             (error) => {
//                 return []
//             }
//         )
// }


// admin code

const getAdminData = async () => {
    return await axiosInstance.get("/admin")
        .then(
            (response) => {
                return response.data.admins
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


const AdminTrash = async () => {
    return await axiosInstance.get("/admin/getTrashed")
        .then(
            (response) => {
                return response.data.admins
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getAllOrders = async () => {
    return await axiosInstance.get("/order")
        .then(
            (response) => {
                return response.data.orders
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


export { CategoryData, CategoryTrash, GetCategoryByID, ColorTrash, GetColorByID, ColorData, ProductData, getProductByID, ProductTrash, AccessoryData, getAccessoryByID, AccessoryTrash, getUserData, getAdminData, AdminTrash , getAllOrders}
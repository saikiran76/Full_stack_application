import asyncHandler from '../services/asyncHandler'
import Collection from '../models/collection.schema'
import CustomError from '../utils/customerError'


/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const createCollection = asyncHandler(async(req, res)=>{
    const {name} = req.body

    if(!name){
        throw new CustomError("Collection name is required", 400)
    }

    // add this collection name into DB
    const CollectionName = Collection.create({
        name
    })

    //send this response value to frontend
    res.status(200).json({
        success: true,
        message: "Collection has been created successfully",


    })

})

export const updateCollection = asyncHandler(async(req, res)=>{
    // existing value to be updated
    const {id: collectionId} = req.params
    // new value to be updated with
    const newName = req.body

    if(!newName){
        throw new CustomError("Colletion name is required", 404)
    }
    // DB operations always shall have await
    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId, 
        { // [properties to be update]
            newName,
        },
        { // give me the new updated value
            new: true,
            runValidators: true
        }   
    )

    if(!updatedCollection){
        throw new CustomError("Collection not found", 400)
    }

    // send response to frontend 
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })


})


export const deleteCollection = asyncHandler(async(req, res)=>{
    // get the element by id, id should be deleted so grab it and delete it
    const {id: collectionId} = req.params

    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)

    if(!collectionToDelete){
        throw new CustomError("Collection not found", 400)
    }

    collectionToDelete.remove()

    // send response to frontend
    res.status(200).json({
        success: true,
        message: "Collection has been deleted successfully", 
    })

})

// Client request - want to see the list of categories that have been created
export const getAllCollections = asyncHandler(async(req, res) => {
    const collections = await Collection.find()

    if (!collections) {
        throw new CustomError("No Collection found", 400)
    }

    res.status(200).json({
        success: true,
        collections
    })
})

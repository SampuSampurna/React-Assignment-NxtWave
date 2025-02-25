import React, { useState, useEffect } from "react";
import ListContainer from "../components/ListContainer";
import "../App.css";
import errorImage from "./something-went-wrong.png";

const Home = () => {
    // State variables
    const [isLoading, setIsLoading] = useState(true); // Tracks if data is being loaded
    const [error, setError] = useState(false); // Tracks if there is an error in fetching data
    const [lists, setLists] = useState([]); // Stores the list of items from API
    const [selectedLists, setSelectedLists] = useState([]); // Stores the selected lists
    const [createListError, setCreateListError] = useState(""); // Error message when selecting lists incorrectly
    const [showEmptyList, setShowEmptyList] = useState(false); // Controls the visibility of the new list
    const [originalLists, setOriginalLists] = useState([]); // Stores original data to restore on cancel

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch("https://apis.ccbp.in/list-creation/lists");
            const data = await response.json();
            console.log("Full API Response:", data);

            if (data && data.lists && Array.isArray(data.lists)) {
                setLists(data.lists);
                setOriginalLists(data.lists); // Save original data for cancel functionality
                setIsLoading(false);
                setError(false);
            } else {
                throw new Error("Invalid API Response Format");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle checkbox selection of lists
    const handleCheckboxChange = (listNumber) => {
        setSelectedLists((prevSelected) => {
            const updatedSelection = prevSelected.includes(listNumber)
                ? prevSelected.filter((num) => num !== listNumber) // Deselect list
                : [...prevSelected, listNumber]; // Select list
            
            setCreateListError(""); // Clear any previous error message
            return updatedSelection;
        });
    };

    // Function to create a new empty list (Only if exactly two lists are selected)
    const handleCreateNewList = () => {
        if (selectedLists.length !== 2) {
            setCreateListError("You should select exactly 2 lists to create a new list");
            return;
        }
        setShowEmptyList(true); // Display the new empty list
    };

    // Function to move an item from one list to another
    const handleMoveItem = (itemId, targetList) => {
        setLists((prevLists) =>
            prevLists.map((item) =>
                item.id === itemId ? { ...item, list_number: targetList } : item
            )
        );
    };

    // Function to cancel the new list creation and restore the original lists
    const handleCancel = () => {
        setLists(originalLists); // Restore the original state
        setShowEmptyList(false); // Hide the new list
        setSelectedLists([]); // Clear selected lists
    };

    // Function to finalize and update the lists after modifications
    const handleUpdate = () => {
        console.log("Updated lists:", lists);
        setShowEmptyList(false); // Hide the new list after update
    };

    return (
        <div className="home-container">
            {isLoading ? (
                // Display a loading spinner while data is being fetched
                <div className="spinner"></div>
            ) : error ? (
                // Display an error message if data fetching fails
                <div className="error-view">
                    <img src={errorImage} alt="failure view" className="error-image" />
                    <p>Something went wrong. Please try again.</p>
                    <button className="create-btn" onClick={fetchData}>Try Again</button>
                </div>
            ) : (
                <>
                    <h1>List Creation</h1>
                    {/* Display error message if user selects incorrect number of lists */}
                    {createListError && <p className="error-message">{createListError}</p>}
                    
                    {/* Buttons for creating a new list, canceling, and updating */}
                    <div className="button-group">
                        <button className="create-btn" onClick={handleCreateNewList}>Create a new list</button>
                        {showEmptyList && (
                            <>
                                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                <button className="update-btn" onClick={handleUpdate}>Update</button>
                            </>
                        )}
                    </div>

                    {/* Render the ListContainer component with props */}
                    <ListContainer 
                        lists={lists} 
                        onCheckboxChange={handleCheckboxChange} 
                        selectedLists={selectedLists} 
                        showEmptyList={showEmptyList} 
                        moveItem={handleMoveItem}
                    />
                </>
            )}
        </div>
    );
};

export default Home;

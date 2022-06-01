import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

const AUTHORS_GQL = gql `
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;

const ADDBOOK_GQL = gql `
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
            genre
        }
    }
`;

const AddBook = () => {
    const { loading, error, data } = useQuery(AUTHORS_GQL);
    const [addBook, { //data: responseData, 
        error: responseError, loading: responseLoading }] = useMutation(ADDBOOK_GQL, {
        refetchQueries: [
           'GetBooks',
        ]
    });

    const [ bookData, setBookData ] = useState({
        name: '',
        genre: '',
        authorId: '',
    });

    function handleChange(e){
        const { value, name } = e.target;

        setBookData( oldVal => ({...oldVal, [name]: value}));
    }

    function handleSubmit(e){
        e.preventDefault();

        addBook({ variables: {...bookData}});

        setBookData(old => ({...old,
            name: '',
            genre: '',
            authorId: '',
        }));
    }

    return ( 
       <div>
           {
               error && <p>An error occurred loading book authors!</p>
           }
           {/* {
               JSON.stringify(bookData)
           } */}
           {
               loading ? <p>Loading authors...</p> : 
               <form id="add-book" onSubmit={ handleSubmit }>
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" name='name' value={ bookData.name } onChange={ handleChange } required={true}/>
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" name="genre" value={ bookData.genre } onChange={ handleChange } required={true}/>
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select name='authorId' value={ bookData.authorId } onChange={ handleChange } required={true}>
                            <option value=''>--select author--</option>
                            {
                                data.authors.map( author => <option key={author.id} value={author.id}>{author.name}</option>)
                            }
                        </select>
                    </div>
                    <button type="submit" disabled={ responseLoading }>{ responseLoading ? 'Adding...' : 'Add' }</button>
                    {
                        responseError && <p>Failed to add book: { responseError }</p>
                    }
                </form>
           }
       </div>
     );
}
 
export default AddBook;
import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import BookDetails from './BookDetails';

const BOOKS_GQL = gql `
    query GetBooks {
        books {
            id
            name
        }
    }
`;

const BookList = () => {
    const { loading, error, data } = useQuery(BOOKS_GQL);
    const [ id, setId ] = useState(null);

    return ( 
        <div>
            { loading ? <p>Loading books...</p> : 
                <React.Fragment>
                    <ul id="book-list">
                        {
                            data.books.map( book => <li key={ book.id } onClick={() => setId(book.id)}>{ book.name }</li>)
                        }
                    </ul>
                    {
                        id && <BookDetails bookId={id} />
                    }
                </React.Fragment>
            }
            { error && <p>An error occurred fetching books!</p>}
        </div>
     );
}
 
export default BookList;
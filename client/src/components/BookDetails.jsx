import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_BOOK_GQL = gql `
    query Book($id: ID!) {
        book(id: $id) {
            id
            name
            genre
            author {
                age
                name
                books {
                    id
                    name
                }
            }
        }
    }
`;

const BookDetails = ({bookId}) => {
    const { data, loading, error } = useQuery(GET_BOOK_GQL, {
        variables: { id: bookId, }
    });

    return ( 
        <div id='book-details'>
            { loading && <p>Loading details...</p>}
            { error && <p>{ error }</p>}
            { data && (
                <div>
                    <h2>{ data.book.name }</h2>
                    <p>{ data.book.genre }</p>
                    <p>{ data.book.author.name }</p>
                    <p>{ data.book.author.genre }</p>
                    <p>Other books by this author:</p>
                    <ul className="other-books">
                        { !(data.book.author.books.length > 1) && <li>This author has no other books</li>}
                        {
                            data.book.author.books.filter(_book => _book.name !== data.book.name).map( _book => <li key={ _book.id }>{ _book.name }</li>)
                        }
                    </ul>
                </div>
            ) }
        </div>
     );
}
 
export default BookDetails;
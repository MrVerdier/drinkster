import React from 'react'

export default function Pagination(props) {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(props.totalDrinks / props.drinksPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination-nav">
            <ul>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={(e) => props.paginate(number, e)} href="!#" >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    ) 
}
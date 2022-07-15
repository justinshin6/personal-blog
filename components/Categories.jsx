import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
    const [categories, setCategories] = useState([])

    // retrieve categories with getCategories() GraphQL query
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, [])
    return (
        <div className='bg-gray-700	bg-opacity-30 shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-white text-xl mb-8 font-semibold border-b border-sky-400 pb-4'>
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="text-white cursor-pointer block pb-3 mb-3">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Categories

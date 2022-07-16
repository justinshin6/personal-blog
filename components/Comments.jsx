import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  // when component renders, get comments from the slug link and 
  // then set the comments to the ones generated 
  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result)
    })
  }, [slug])

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-gray-700 bg-opacity-30 shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            <span className="text-white">
            {comments.length}
            {' '}
            {comments.length === 1 ? 'Comment' : 'Comments'}
            </span>

          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-gray-100 mb-4 pb-4">
                <p className="mb-4 text-white">
                  <span className="font-semibold text-white">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className="whitespace-pre-line text-white w-full">{parse(comment.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
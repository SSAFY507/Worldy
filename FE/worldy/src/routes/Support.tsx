import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/SupportStyles.css';

export default function Support() {
  return (
    <div className='w-ful h-full bg-white flex justify-center items-center'>
      <div className='w-[90%] h-[90%] outline outline-red-400 flex flex-row justify-stretch items-center'>
        <div className='w-[40%] h-full outline outline-red-700 flex flex-col justify-start items-center'>
          <div className='w-[80%] h-[40%] outline outline-yellow-500 my-[30px]'>
            <div className='search w-[80%] h-[70px] outline outline-emerald-400'>
              <div className='search-box h-[100%] outline outline-red-400 '>
                <div className='search-field'>
                  <input
                    placeholder='Search...'
                    className='input'
                    type='text'
                  />
                  <div className='search-box-icon h-full flex justify-center items-center py-[10px]'>
                    <button className='btn-icon-content h-full outline outline-yellow-500 flex justify-center items-center'>
                      <i className='search-icon outline outline-red-500'>
                        <svg
                          xmlns='://www.w3.org/2000/svg'
                          version='1.1'
                          viewBox='0 0 512 512'
                        >
                          <path
                            d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
                            fill='#fff'
                          ></path>
                        </svg>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[90%] flex-1 outline outline-green-500 mb-[30px]'></div>
        </div>
        <div className='w-[60%] h-full outline outline-red-700'></div>
      </div>
    </div>
  );
}

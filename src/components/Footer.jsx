import React from 'react'
import githubImg from '../assets/images/github.svg'
import linkedinImg from '../assets/images/linkedin.svg'

export function Footer() {
  return (
    <footer>
        <span>©BITPocket - All rights reserved</span>
        <section className='dev-social flex align-center'>
            <span>Visit more projects!</span>
            <a href='https://github.com/opkuch' target="_blank"><img className='social-img' src={githubImg} alt="" /></a>
            <a href='https://www.linkedin.com/in/nadav-ben-hur-381584249/' target="_blank"><img className='social-img' src={linkedinImg} alt="" /></a>
        </section>
    </footer>
  )
}

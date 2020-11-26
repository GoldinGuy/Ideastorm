import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
	render() {
		return (
			<div>
				<div className="relative w-full py-20 pb-20 border-none overflow-hidden bg-white  ">
					<svg
						className="absolute bottom-0 w-full border-none text-gray-200 fill-current"
						viewBox="0 0 1400 74"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0 24C87.243 11.422 173.12 5.133 257.633 5.133 468.305 5.133 578.027 74 700 74c136.015 0 290.882-96.208 481.234-68.867C1268.807 17.71 1341.73 24 1400 24v50H0V24z" />
					</svg>
				</div>

				{/* TODO: suggested for you  */}
				<div className="relative w-full pt-24 pb-56 border-none bg-gray-200">
					<svg
						className="absolute bottom-0 w-full border-none text-black fill-current"
						viewBox="0 0 1400 74"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0 24C87.243 11.422 173.12 5.133 257.633 5.133 468.305 5.133 578.027 74 700 74c136.015 0 290.882-96.208 481.234-68.867C1268.807 17.71 1341.73 24 1400 24v50H0V24z" />
					</svg>
				</div>
				<footer className="px-4 pt-12 pb-8 text-white border-none bg-black">
					<div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
						<Link to="/" className="block w-1/3 mr-4 border-none">
							<span className="flex items-center border-none">
								<svg
									className="w-auto h-8 mt-1 border-none text-white fill-current"
									viewBox="0 0 215 151"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
								>
									<defs>
										<linearGradient
											x1="56.965%"
											y1="53.262%"
											x2="7.891%"
											y2="29.24%"
											id="b"
										>
											<stop stopColor="#FFCD26" offset="0%" />
											<stop stopColor="#FFDF95" offset="100%" />
										</linearGradient>
										<path
											d="M95.655.001c-24.386 0-43.538 13.864-52.36 34.66-5.144 12.126-3.711 24.522.084 29.027 2.435-5.804 11.57-15.424 29.476-15.424h79.952c29.783 0 54.375-30.377 61.963-48.263H95.655zM67.693 65.916C23.419 65.916.085 105.344 0 137.666v.345c.011 4.322.439 8.517 1.291 12.466 2.433-5.804 19.956-36.297 47.062-36.297h23.225c29.783 0 54.375-30.378 61.963-48.264H67.693z"
											id="a"
										/>
									</defs>
									<g fill="none" fillRule="evenodd">
										<mask id="c" fill="#fff">
											<use xlinkHref="#a" />
										</mask>
										<path
											d="M95.655.001c-24.386 0-43.538 13.864-52.36 34.66-5.144 12.126-3.711 24.522.084 29.027 2.435-5.804 11.57-15.424 29.476-15.424h79.952c29.783 0 54.375-30.377 61.963-48.263H95.655zM67.693 65.916C23.419 65.916.085 105.344 0 137.666v.345c.011 4.322.439 8.517 1.291 12.466 2.433-5.804 19.956-36.297 47.062-36.297h23.225c29.783 0 54.375-30.378 61.963-48.264H67.693z"
											fill="url(#b)"
											mask="url(#c)"
										/>
									</g>
								</svg>
								<Link to="/" className="ml-2 text-lg font-black">
									Ideastorm
								</Link>
							</span>
						</Link>
						<div className="block w-2/3 mt-6 text-sm sm:flex lg:mt-0">
							<ul className="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
								<li className="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">
									<Link to="/search?q=education">Education</Link>
								</li>
								<li>
									<Link
										to="/search?q=science-fair"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Science Fair
									</Link>
								</li>
								<li>
									<Link
										to="/search?q=food"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Foodies
									</Link>
								</li>
								<li>
									<Link
										to="/search?q=crafts"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Crafts & Projects
									</Link>
								</li>
							</ul>
							<ul className="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
								<li className="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">
									<Link to="/search?q=tech">Tech</Link>
								</li>
								<li>
									<Link
										to="/search?q=website"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Sites
									</Link>
								</li>
								<li>
									<Link
										to="/search?q=app"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Apps
									</Link>
								</li>

								<li>
									<Link
										to="/search?q=dev"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Dev Tools
									</Link>
								</li>
							</ul>

							<ul className="flex flex-col w-full p-0 font-thin text-left text-gray-700 list-none">
								<li className="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">
									Site
								</li>
								<li>
									<a
										href="mailto:seth@goldinwebdesign.com"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Contact
									</a>
								</li>
								<li>
									<Link
										to="/terms"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										to="/jobs"
										className="inline-block px-3 py-2 text-gray-300 no-underline hover:text-white"
									>
										Join the Team
									</Link>
								</li>
							</ul>
							<div className="flex flex-col w-full text-gray-700">
								<div className="inline-block px-3 py-2 font-medium tracking-wide text-white uppercase">
									Follow Us!
								</div>
								<div className="flex justify-start pl-4 mt-2">
									<a
										className="flex items-center block mr-6 text-gray-300 no-underline hover:text-white"
										target="_blank"
										rel="noopener noreferrer"
										href="https://www.facebook.com/GoldinWebDesign/"
									>
										<svg
											viewBox="0 0 24 24"
											className="w-5 h-5 fill-current"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
										</svg>
									</a>
									<a
										className="flex items-center block mr-6 text-gray-300 no-underline hover:text-white"
										target="_blank"
										rel="noopener noreferrer"
										href="https://twitter.com/GoldinWeb"
									>
										<svg
											viewBox="0 0 24 24"
											className="w-5 h-5 fill-current"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
										</svg>
									</a>
									<a
										className="flex items-center block text-gray-300 no-underline hover:text-white"
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/GoldinGuy/"
									>
										<svg
											viewBox="0 0 24 24"
											className="w-5 h-5 fill-current"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-4 pt-6 mt-10 text-center border-none text-gray-600 border-t border-gray-800">
						{" "}
						©2020 Ideastorm.{" "}
						<span className="sm:hidden">
							<br />
						</span>{" "}
						Created with 💙 by{" "}
						<a href="https://goldinwebdesign.com/" className="">
							Goldin Web Design.
						</a>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;

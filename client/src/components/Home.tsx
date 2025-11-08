import logo from "@/assets/n&j.svg";

function Home() {
	
	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<a
				href="https://github.com/sws-corp/nuit-et-jour"
				target="_blank"
				rel="noopener"
			>
				<img
					src={logo}
					className="w-16 h-16 cursor-pointer"
					alt="nuit et jour logo"
				/>
			</a>
			<h1 className="text-5xl font-black">Nuit et Jour</h1>
			<p>Welcome :)</p>
		</div>
	);
}

export default Home;

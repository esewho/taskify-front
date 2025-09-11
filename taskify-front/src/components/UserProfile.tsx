import React from "react"

export default function UserProfile() {
	return (
		<div className="flex-1 flex flex-direction-column w-3/3 h-screen">
			<section className="flex-1 bg-white rounded-lg shadow m-4 p-4 max-w-md">
				<div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
					<div className="flex items-center">
						<img
							src="https://via.placeholder.com/50"
							alt="User Avatar"
							className="w-12 h-12 rounded-full mr-4"
						/>
						<div className="text-center align-items-center">
							<h2 className="font-bold text-lg">Nombre de Usuario</h2>
							<p className="text-gray-600" />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

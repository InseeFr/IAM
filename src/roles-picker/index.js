import React, { useState, useRef, useEffect } from 'react';
import './roles-picker.scss';
import D from '../build-dictionary';

function useOutsideAlerter(ref, callback) {
	function handleClickOutside(event) {
		if (
			ref.current &&
			!ref.current.contains(event.target) &&
			event.target.tagName !== 'HTML'
		) {
			callback();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
}

export default function RolesPicker({
	roles = [],
	person = {},
	defaultOpen = false,
	handleSubmit,
}) {
	const [open, setOpen] = useState(defaultOpen);
	const [userRoles, setUserRoles] = useState(person.roles);
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, () => setOpen(false));

	const handleButtonClick = () => {
		const addArray = userRoles.filter(role => !person.roles.includes(role));
		const delArray = person.roles.filter(role => !userRoles.includes(role));

		const toAdd =
			addArray.length > 0
				? [
						{
							id: person.id,
							roles: addArray.map(
								label => roles.find(r => r.label === label).id
							),
						},
				  ]
				: [];

		const toDelete =
			delArray.length > 0
				? delArray.map(label => ({
						role: roles.find(r => r.label === label).id,
						id: person.id,
				  }))
				: [];

		const updates = {
			toAdd,
			toDelete,
		};
		handleSubmit(updates);

		setOpen(!open);
	};

	const handleRoleClick = role => {
		const newUserRoles = userRoles.includes(role.label)
			? userRoles.filter(label => label !== role.label)
			: [...userRoles, role.label];

		setUserRoles(newUserRoles);
	};

	return (
		<div ref={wrapperRef} className={`iam-roles-picker btn-group`}>
			<button
				type="button"
				className="btn btn-default dropdown-toggle"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
				onClick={() => {
					setOpen(!open);
				}}
			>
				{D.manage}
			</button>
			{open && (
				<ul className="dropdown-menu show">
					{roles.map(role => (
						<li key={role.label}>
							<label>
								<input
									onChange={() => handleRoleClick(role)}
									type="checkbox"
									checked={userRoles.indexOf(role.label) >= 0}
								/>
								{role.label}
							</label>
						</li>
					))}

					<li>
						<button onClick={handleButtonClick}>{D.save}</button>
					</li>
				</ul>
			)}
		</div>
	);
}

import React, { useState, useCallback } from 'react';
import './roles-picker.scss';
import D from '../build-dictionary';

export default function RolesPicker({
	roles = [],
	person = {},
	defaultOpen = false,
	handleSubmit,
}) {
	console.log('rerender');
	const [open, setOpen] = useState(defaultOpen);
	const [userRoles, setUserRoles] = useState(person.roles);
	console.log(userRoles);

	const handleClick = useCallback(
		e => {
			e.preventDefault();
			setOpen(!open);
		},
		[open]
	);

	const handleButtonClick = useCallback(
		e => {
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
		},
		[userRoles]
	);

	const handleRoleClick = role =>
		useCallback(
			e => {
				const newUserRoles = userRoles.includes(role.label)
					? userRoles.filter(label => label !== role.label)
					: [...userRoles, role.label];

				console.log(role.label);

				console.log(userRoles);

				console.log(newUserRoles);
				setUserRoles(newUserRoles);
			},
			[userRoles]
		);
	return (
		<div className={`iam-roles-picker btn-group ${open ? 'open' : ''}`}>
			<button
				type="button"
				className="btn btn-default dropdown-toggle"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
				onClick={handleClick}
			>
				{D.manage} <span className="caret"></span>
			</button>
			<ul className="dropdown-menu">
				{roles.map(role => (
					<li key={role.label}>
						<input
							onClick={handleRoleClick(role)}
							type="checkbox"
							checked={userRoles.indexOf(role.label) >= 0}
						/>
						{role.label}
					</li>
				))}

				<li>
					<button onClick={handleButtonClick}>{D.save}</button>
				</li>
			</ul>
		</div>
	);
}

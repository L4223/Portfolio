const firstName = 'Lasse';
const lastName = 'Knodt';
const suffix = 'Portfolio';

const BaseData = {
	firstName,
	lastName,
	suffix,
	get fullName() {
		return `${firstName} ${lastName}`;
	}
};

export default BaseData;

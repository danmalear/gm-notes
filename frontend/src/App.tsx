import { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';

const App: React.FC = () => {
	const navigate = useNavigate();
	const campaignMatch = useMatch('/campaign');

	useEffect(() => {
		if (!campaignMatch) {
			navigate('/campaign');
		}
	});

	return (
		<>
			<Outlet />
		</>
	);
};

export default App;

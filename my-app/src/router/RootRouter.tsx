import { Routes, Route } from 'react-router-dom';
import SummaryPage from '../pages/SummaryPage';
import SequencePage from '../pages/SequencePage';
import ProductName from '../pages/ProductName';
import { StepPath } from '../features/enum';

const RootRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={StepPath.ProductName} element={<ProductName />} />
            <Route path={StepPath.SequenceSteps} element={<SequencePage />} />
            <Route path={StepPath.Summary} element={<SummaryPage />} />
        </Routes>
    );
};

export default RootRouter;
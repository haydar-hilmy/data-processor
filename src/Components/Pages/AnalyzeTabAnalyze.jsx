import { useEffect, useState, useCallback, useRef } from "react"
import Header from "../Fragments/Header/Header"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useParams } from 'react-router-dom';
import { DataGet, findRecord } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { detectColumnType, getColumnNames, recommendLabelColumn, splitDataByType } from "../../Function/TableFunction"
import DropDown from "../Elements/LabeledInput/DropDown"
import ButtonMain from "../Elements/Button/Button"
import { Analytics, Autorenew, BubbleChart, Category, PlayArrow, Start, Timeline } from "@mui/icons-material"
import SubNav from "../Fragments/SubNav/SubNav"
import LabeledInput from "../Elements/LabeledInput/LabeledInput"
import LabeledInputWrap from "../Elements/LabeledInput/LabeledInputWrap"
import Label from "../Elements/LabeledInput/Label"
import { BarChart, DoughnutChart } from "../Elements/Chart/Charts"
import CardRadioBtn from "../Elements/Radio/CardRadioBtn"
import CheckboxLabel from "../Elements/Checkbox/CheckboxLabel"
import CheckboxLabelList from "../Elements/Checkbox/CheckboxLabelList"
import { NeuralNetwork } from "../../Function/TensorFlow/ProcessModel"
import { getSubset, valueOfColumn } from "../../Function/TensorFlow/DataManipulate"

const AnalyzeTabAnalyze = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [theadMainDataset, setTheadMainDataset] = useState([])
    const [tbodyMainDataset, setTbodyMaindataset] = useState([])
    const [tipsText, setTipsText] = useState("")
    const [subTab, setSubTab] = useState("setup")

    const [typeMainDataset, setTypeMainDataset] = useState(null)

    // ------- SETUP --------
    // Choose a Method
    const [analyzeMethod, setAnalyzeMethod] = useState('')

    // ANALYSIS PARAMETER
    const [labelAnalysis, setLabelAnalysis] = useState('')
    const [recommendLabel, setRecommendLabel] = useState([])
    const [clfMod, setClfMod] = useState('') // Classification Model
    const [regMod, setRegMod] = useState('') // Regression Model
    const [clusMod, setClusMod] = useState('') // Clustering Model
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [exceptLabel, setExceptLabel] = useState([])

    const [valueOfColMainDataset, setValueOfColMainDataset] = useState([])

    const [testingInputs, setTestingInputs] = useState(selectedFeatures)
    const addTestingInput = () => {
        const obj = Object.fromEntries(selectedFeatures.map(feature => [feature, '']));
        setTestingInputs([obj]);
    };

    const { iddataset } = useParams()

    useEffect(() => {
        setIsLoading(true)
        DataGet(iddataset).then((result) => {
            setDatasets(result);
            setIsLoading(false);
            setTheadMainDataset(getColumnNames(result.data))
            setTbodyMaindataset(result.data)
            setTypeMainDataset(splitDataByType(result.data, detectColumnType(result.data)))
            setRecommendLabel(recommendLabelColumn(result.data))
            setValueOfColMainDataset(valueOfColumn(getSubset(result.data, 30)))
        }).catch(err => {
            console.error(err);
        });
    }, [iddataset])



    ////////////// STARTING PROCESS ///////////////
    const processClf = () => {
        if (clfMod == "Neural Network") {
            NeuralNetwork(tbodyMainDataset, testingInputs, labelAnalysis, selectedFeatures)
        } else {
            console.log("Else")
        }
        console.log(`feat: ${selectedFeatures}, Model: ${clfMod}, Label: ${labelAnalysis}`)
    }




    const handleClickSubTab = (tab) => {
        setSubTab(tab)
    }

    const handleLabelAnalysis = (value) => {
        setLabelAnalysis(value);
        setExceptLabel([value]);
    };


    const handleFeatures = (value) => {
        setSelectedFeatures((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };
    useEffect(() => {
        addTestingInput()
    }, [selectedFeatures])


    useEffect(() => {
        console.info("Testing input: ", testingInputs)
    }, [testingInputs])



    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="Data Processing and Analysis" infoText={`${dataset.name} | ${dataset.data.length > 1 ? `${dataset.data.length.toLocaleString('id-ID')} records` : `${dataset.data.length} record`}`}>
                        <CircleLoading isLoading={isLoading} />
                    </Header>
                    <div className="flex flex-col gap-4">
                        <SubNav>
                            <div onClick={() => handleClickSubTab("setup")} className={`${subTab == "setup" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Setup
                            </div>
                            <div onClick={() => handleClickSubTab("dataset")} className={`${subTab == "dataset" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Dataset
                            </div>
                            <div onClick={() => handleClickSubTab("analysis")} className={`${subTab == "analysis" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Analysis
                            </div>
                            <div onClick={() => handleClickSubTab("result")} className={`${subTab == "result" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Result
                            </div>
                        </SubNav>
                    </div>

                    {
                        subTab == "dataset" ? (
                            <>
                                <MainTable tbody={tbodyMainDataset} thead={theadMainDataset} isLimitDataShow={true} />
                            </>
                        ) :
                            subTab == "setup" ? (
                                <div className="mt-4">

                                    <div className="mt-3">
                                        <h1 className="text-xl mb-2">Choose a Method</h1>
                                        <div className="flex flex-col sm:flex-row gap-2 justify-stretch">
                                            <CardRadioBtn
                                                name="AnalyzeMethod"
                                                data={[
                                                    {
                                                        text: "Classification",
                                                        infoText: "A method to predict categories or labels based on existing patterns. Ideal for tasks like spam detection or facial recognition.",
                                                        id: "classification",
                                                        value: "classification",
                                                        icon: <Category />,
                                                        onclick: (value) => setAnalyzeMethod(value)
                                                    },
                                                    {
                                                        text: "Regression",
                                                        infoText: "A method to predict continuous values like prices, sales,or temperatures based on variable relationships.",
                                                        id: "regression",
                                                        value: "regression",
                                                        icon: <Timeline />,
                                                        onclick: (value) => setAnalyzeMethod(value)
                                                    },
                                                    {
                                                        text: "Clustering",
                                                        infoText: "A method to group similar data points into clusters based on similarity. Useful for customer segmentation or pattern analysis.",
                                                        id: "clustering",
                                                        value: "clustering",
                                                        icon: <BubbleChart />,
                                                        onclick: (value) => setAnalyzeMethod(value)
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <h1 className="text-xl mb-4">Analyze Parameter</h1>
                                        {
                                            analyzeMethod == "classification" ? (
                                                <div className="flex flex-col items-start gap-4">
                                                    <DropDown label="Select the Target Label" value={labelAnalysis} name="classification_label" onchange={(value) => handleLabelAnalysis(value)} data={theadMainDataset} recommend={recommendLabel} text="Select a label" />
                                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                                        <DropDown label="Select Classification Model" value={clfMod} name="classfication_alg" onchange={(value) => setClfMod(value)} data={["Neural Network", "Decision Tree", "Random Forest"]} text="Choose a Model" />
                                                        {
                                                            clfMod == "KNN" ? (
                                                                <>
                                                                    <LabeledInput min={1} name="kvalue" type="number" placeholder="Enter K value" text="Number of Neighbors (K)" />
                                                                </>
                                                            ) : ""
                                                        }
                                                    </div>
                                                    <div className="w-full">
                                                        <CheckboxLabelList specialCheckbox={"Automatic Select Features"} text={"Select Features"} onchangeSpecial={() => setSelectedFeatures([])} onchange={(e) => handleFeatures(e.target.value)} exception={exceptLabel} listData={theadMainDataset} recommend={recommendLabel} />
                                                    </div>
                                                    <div>
                                                        {
                                                            testingInputs && testingInputs.length > 0 && (
                                                                <h2 className="ml-3 my-2 text-md opacity-60 font-normal">Data Testing</h2>
                                                            )
                                                        }
                                                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
                                                            {
                                                                testingInputs.map((obj, objIdx) => (
                                                                    Object.keys(obj).map((row, rowIdx) => (
                                                                        valueOfColMainDataset
                                                                            .filter((vCol) => vCol.hasOwnProperty(selectedFeatures[rowIdx]))
                                                                            .map((vCol, vColIdx) => (
                                                                                <div key={vColIdx}>
                                                                                    {vCol[selectedFeatures[rowIdx]].type == 'numerical' ? (
                                                                                        <LabeledInput
                                                                                            type={"number"}
                                                                                            info={`Suggestion: ${vCol[selectedFeatures[rowIdx]].data.min} - ${vCol[selectedFeatures[rowIdx]].data.max}`}
                                                                                            value={obj[selectedFeatures[rowIdx]]}
                                                                                            name={`${selectedFeatures[rowIdx]}_testingCls`}
                                                                                            placeholder={`Testing ${selectedFeatures[rowIdx]}`}
                                                                                            text={selectedFeatures[rowIdx]}
                                                                                            onchange={(e) => {
                                                                                                const newInputs = [...testingInputs];
                                                                                                newInputs[objIdx] = { 
                                                                                                    ...newInputs[objIdx],
                                                                                                    [selectedFeatures[rowIdx]]: e.target.value
                                                                                                };
                                                                                                setTestingInputs(newInputs);
                                                                                            }} />
                                                                                    ) : vCol[selectedFeatures[rowIdx]].type == "categorical" ? (
                                                                                        <DropDown
                                                                                            value={obj[selectedFeatures[rowIdx]]}
                                                                                            label={selectedFeatures[rowIdx]}
                                                                                            name={`${selectedFeatures[rowIdx]}_testingCls`}
                                                                                            text={`Testing ${selectedFeatures[rowIdx]}`}
                                                                                            data={vCol[selectedFeatures[rowIdx]].data}
                                                                                            onchange={(eValue) => {
                                                                                                const newInputs = [...testingInputs];
                                                                                                newInputs[objIdx] = { 
                                                                                                    ...newInputs[objIdx],
                                                                                                    [selectedFeatures[rowIdx]]: eValue };
                                                                                                setTestingInputs(newInputs);
                                                                                            }}
                                                                                        />
                                                                                    ) : ("Undefined")}
                                                                                </div>
                                                                            ))
                                                                    ))
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                    <ButtonMain variant="bg-btn-primary" onclick={() => processClf()}><PlayArrow /> Process</ButtonMain>
                                                </div>
                                            ) : analyzeMethod == "regression" ? (
                                                <div className="flex flex-col items-start gap-4">
                                                    <DropDown label="Select the Target Label" value={labelAnalysis} name="label_regression" onchange={(value) => handleLabelAnalysis(value)} data={theadMainDataset} recommend={recommendLabel} text="Select a label" />
                                                    <div className="flex items-start">
                                                        <DropDown label="Select Regression Model" value={regMod} name="regression_alg" onchange={(value) => setRegMod(value)} data={["Linear", "Polynomial", "Ridge"]} text="Choose a Model" />
                                                    </div>
                                                    <ButtonMain variant="bg-btn-primary"><PlayArrow /> Process</ButtonMain>
                                                </div>
                                            ) : analyzeMethod == "clustering" ? (
                                                <div className="flex flex-col items-start gap-4">
                                                    <DropDown label="Select Clustering Model" value={clusMod} name="clustering_alg" onchange={(value) => setClusMod(value)} data={["Hierarchical", "K-Means"]} text="Choose a Model" />
                                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                                        <LabeledInput min={1} name="totalClus" type="number" placeholder="Enter clusters" text="Number of Clusters" />
                                                        <LabeledInput min={1} name="maxIterate_clus" type="number" placeholder="Enter max iterations" text="Maximum Iterations" />
                                                    </div>
                                                    <ButtonMain variant="bg-btn-primary"><PlayArrow /> Process</ButtonMain>
                                                </div>
                                            ) : ""
                                        }
                                    </div>

                                </div>
                            ) : subTab == "analysis" ? (
                                <>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div style={{ flex: 1, width: '45%' }}>
                                            <MainTable infoText="Categorical" tbody={typeMainDataset.categoricalData} thead={getColumnNames(typeMainDataset.categoricalData)} />
                                        </div>
                                        <div style={{ flex: 1, width: '45%' }}>
                                            <MainTable infoText="Numerical" tbody={typeMainDataset.numericalData} thead={getColumnNames(typeMainDataset.numericalData)} />
                                        </div>
                                    </div>
                                </>
                            ) : subTab == "result" ? (
                                <>
                                    <BarChart />
                                    <DoughnutChart />
                                </>
                            ) : ("")
                    }

                </>
            ) : (
                <>
                    <Header headerText="View of Dataset" infoText={"Dataset not found"}></Header>
                </>
            )}
        </>
    )
}

export default AnalyzeTabAnalyze
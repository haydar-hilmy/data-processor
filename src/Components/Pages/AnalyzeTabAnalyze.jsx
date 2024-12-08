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
import { DecisionTreeModel } from "../../Function/TensorFlow/ProcessModel"

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
    const [clfAlg, setClfAlg] = useState('') // Classification Algoritma
    const [regAlg, setRegAlg] = useState('') // Classification Algoritma
    const [clusAlg, setClusAlg] = useState('') // Clustering Algoritma
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [exceptLabel, setExceptLabel] = useState([])

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

        }).catch(err => {
            console.error(err);
        });
    }, [iddataset])



    ////////////// STARTING PROCESS ///////////////
    const processClf = () => {
        if(clfAlg == "Decision Tree"){
            // DecisionTreeModel(tbodyMainDataset,)
            console.log(tbodyMainDataset)
        } else {
            console.log("Else")
        }
        console.log(`feat: ${selectedFeatures}, Alg: ${clfAlg}, Label: ${labelAnalysis}`)
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
                                                        <DropDown label="Select Classification Algorithm" value={clfAlg} name="classfication_alg" onchange={(value) => setClfAlg(value)} data={["KNN", "Decision Tree", "Random Forest"]} text="Choose an Algorithm" />
                                                        {
                                                            clfAlg == "KNN" ? (
                                                                <>
                                                                    <LabeledInput min={1} name="kvalue" type="number" placeholder="Enter K value" text="Number of Neighbors (K)" />
                                                                </>
                                                            ) : ""
                                                        }
                                                    </div>
                                                    <div className="w-full">
                                                        <CheckboxLabelList specialCheckbox={"Automatic Select Features"} text={"Select Features"} onchangeSpecial={() => setSelectedFeatures([])} onchange={(e) => handleFeatures(e.target.value)} exception={exceptLabel} listData={theadMainDataset} recommend={recommendLabel} />
                                                    </div>
                                                    <ButtonMain variant="bg-btn-primary" onclick={() => processClf()}><PlayArrow /> Process</ButtonMain>
                                                </div>
                                            ) : analyzeMethod == "regression" ? (
                                                <div className="flex flex-col items-start gap-4">
                                                    <DropDown label="Select the Target Label" value={labelAnalysis} name="label_regression" onchange={(value) => handleLabelAnalysis(value)} data={theadMainDataset} recommend={recommendLabel} text="Select a label" />
                                                    <div className="flex items-start">
                                                        <DropDown label="Select Regression Algorithm" value={regAlg} name="regression_alg" onchange={(value) => setRegAlg(value)} data={["Linear", "Polynomial", "Ridge"]} text="Choose an Algorithm" />
                                                    </div>
                                                    <ButtonMain variant="bg-btn-primary"><PlayArrow /> Process</ButtonMain>
                                                </div>
                                            ) : analyzeMethod == "clustering" ? (
                                                <div className="flex flex-col items-start gap-4">
                                                    <DropDown label="Select Clustering Algorithm" value={clusAlg} name="clustering_alg" onchange={(value) => setClusAlg(value)} data={["Hierarchical", "K-Means"]} text="Choose an Algorithm" />
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
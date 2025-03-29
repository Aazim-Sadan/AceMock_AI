import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./loader-page";
import CustomBreadCrumb from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import InterviewPin from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import WebCam from "react-webcam"



const MockLoadPage = () => {
    const { interviewId } = useParams<{ interviewId: string }>();
    const [interview, setInterview] = useState<Interview | null>(null);
    const [isLoading] = useState(false);
    const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

    const navigate = useNavigate();

    if (!interviewId) {
        navigate("/generate", { replace: true })
    }

    useEffect(() => {
        const fetchInterview = async () => {
            if (interviewId) {
                try {
                    const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
                    if (interviewDoc.exists()) {
                        setInterview({
                            id: interviewDoc.id,
                            ...interviewDoc.data()
                        } as Interview);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchInterview();
    }, [interviewId, navigate])

    if (isLoading) {
        return <LoaderPage className="w-full h-[70vh]" />
    }

    if (!interview) {
        navigate("/generate", { replace: true });
    }

    return (
        <div className="flex flex-col w-full gap-8 py-5">
            <div className="flex items-center justify-between w-full gap-2">
                <CustomBreadCrumb
                    breadCrumbPage={interview?.position || ""}
                    breadCrumbItems={[{ label: "Mock Interviews", link: "/generate" }]}
                />
                <Link to={`/generate/interview/${interviewId}/start`}>
                    <Button size={"sm"}>
                        Start <Sparkles />
                    </Button>
                </Link>
            </div>

            {interview && <InterviewPin interview={interview} onMockPage />}

            <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-sky-600" />

                <div>
                    <AlertTitle className="text-sky-800 font-semibold">
                        Important Note
                    </AlertTitle>
                    <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
                        Press "Record Answer" to begin answering the question. Once you
                        finish the interview, you&apos;ll receive feedback comparing your
                        responses with the ideal answers.
                        <br />
                        <br />
                        <strong>Note:</strong>{" "}
                        <span className="font-medium">Your video is never recorded.</span>{" "}
                        You can disable the webcam anytime if preferred.
                    </AlertDescription>
                </div>
            </Alert>


            <div className="flex items-center justify-center w-full h-full">
                <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
                    {isWebCamEnabled ? (
                        <WebCam
                            onUserMedia={() => setIsWebCamEnabled(true)}
                            onUserMediaError={() => setIsWebCamEnabled(false)}
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
                    {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
                </Button>
            </div>
        </div>
    )
}

export default MockLoadPage;
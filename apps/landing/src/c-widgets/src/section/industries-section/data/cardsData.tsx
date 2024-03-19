
import cpaCrmSrc from "@landing/assets/images/main/industries-section/cpa-crm.svg"
import storesSrc from "@landing/assets/images/main/industries-section/stores.svg"
import itSrc from "@landing/assets/images/main/industries-section/it.svg"
import marketingSrc from "@landing/assets/images/main/industries-section/marketing.svg"
import coursesSrc from "@landing/assets/images/main/industries-section/courses.svg"
import mediaSrc from "@landing/assets/images/main/industries-section/media.svg"

export const CARDS_DATA: Array<{image: string, title: JSX.Element}> = [
    {
        image: cpaCrmSrc,
        title: <>CPA &amp;&nbsp;CPM<br/>
        agencies</>
    },
    {
        image: storesSrc,
        title: <>Online stores<br/>& marketplaces</>
    },
    {
        image: itSrc,
        title: <>IT companies</>
    },
    {
        image: marketingSrc,
        title: <>Marketing<br/>agencies</>
    },
    {
        image: coursesSrc,
        title: <>Online course<br/>providers</>
    },
    {
        image: mediaSrc,
        title: <>Publishers<br/>and media</>
    },
];

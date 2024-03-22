
import crm from "@landing/assets/images/main/industries-section/cpa-crm.svg"
import stores from "@landing/assets/images/main/industries-section/stores.svg"
import it from "@landing/assets/images/main/industries-section/it.svg"
import marketing from "@landing/assets/images/main/industries-section/marketing.svg"
import courses from "@landing/assets/images/main/industries-section/courses.svg"
import media from "@landing/assets/images/main/industries-section/media.svg"

export const CARDS_DATA: Array<{image: string, title: JSX.Element}> = [
    {
        image: crm,
        title: <>CPA &amp;&nbsp;CPM<br/> 
        agencies</>
    },
    {
        image: it,
        title: <>Software development<br/>
        outsourcing<br/>
        companies</>
    },
    {
        image: media,
        title: <>Publishers<br/>and media</>
    },
    {
        image: marketing,
        title: <>Marketing<br/>agencies</>
    },
    {
        image: courses,
        title: <>Online course<br/>providers</>
    },
    {
        image: stores,
        title: <>Online stores<br/>& marketplaces</>
    },
];
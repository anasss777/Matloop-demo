import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleBrandSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  carBrand: string;
};

const BrandSelector = ({ handleBrandSelected, carBrand }: Props) => {
  const t = useTranslations("newPost");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleBrandSelected}
        className={`bg-primary rounded-md px-2 mt-20 text-white`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {carBrand?.length > 0 ? carBrand : t("carBrand")}
        </option>
        <option className={`text-black bg-white`} value="abarth">
          أبارث / Abarth{" "}
        </option>
        <option className={`text-black bg-white`} value="acura">
          اكورا / Acura{" "}
        </option>
        <option className={`text-black bg-white`} value="alfa-romeo">
          الفا روميو / Alfa Romeo{" "}
        </option>
        <option className={`text-black bg-white`} value="aston-martin">
          أستون مارتن / Aston Martin{" "}
        </option>
        <option className={`text-black bg-white`} value="audi">
          أودي / Audi{" "}
        </option>
        <option className={`text-black bg-white`} value="baic">
          بيك / BAIC{" "}
        </option>
        <option className={`text-black bg-white`} value="bentley">
          بنتلي / Bentley{" "}
        </option>
        <option className={`text-black bg-white`} value="bestune">
          بيستون / Bestune{" "}
        </option>
        <option className={`text-black bg-white`} value="bmw">
          بي ام دبليو / BMW{" "}
        </option>
        <option className={`text-black bg-white`} value="borgward">
          برجورد / Borgward{" "}
        </option>
        <option className={`text-black bg-white`} value="brilliance">
          بريليانس / Brilliance{" "}
        </option>
        <option className={`text-black bg-white`} value="bugatti">
          بوغاتي / Bugatti{" "}
        </option>
        <option className={`text-black bg-white`} value="byd">
          بي واي دي / BYD{" "}
        </option>
        <option className={`text-black bg-white`} value="cadillac">
          كاديلاك / Cadillac{" "}
        </option>
        <option className={`text-black bg-white`} value="caterham">
          كاترهام / Caterham{" "}
        </option>
        <option className={`text-black bg-white`} value="changan">
          تشانجان / Changan{" "}
        </option>
        <option className={`text-black bg-white`} value="chery">
          شيري / Chery{" "}
        </option>
        <option className={`text-black bg-white`} value="chevrolet">
          شفروليه / Chevrolet{" "}
        </option>
        <option className={`text-black bg-white`} value="chrysler">
          كرايسلر / Chrysler{" "}
        </option>
        <option className={`text-black bg-white`} value="citroen">
          سيتروين / Citroen{" "}
        </option>
        <option className={`text-black bg-white`} value="cmc">
          سي إم سي / CMC{" "}
        </option>
        <option className={`text-black bg-white`} value="daihatsu">
          دايهاتسو / Daihatsu{" "}
        </option>
        <option className={`text-black bg-white`} value="dodge">
          دودج / Dodge{" "}
        </option>
        <option className={`text-black bg-white`} value="dongfeng">
          دونغ فنغ / Dongfeng{" "}
        </option>
        <option className={`text-black bg-white`} value="dorcen">
          دورسين / Dorcen{" "}
        </option>
        <option className={`text-black bg-white`} value="exeed">
          إكسيد / Exeed{" "}
        </option>
        <option className={`text-black bg-white`} value="faw">
          فاو / FAW{" "}
        </option>
        <option className={`text-black bg-white`} value="ferrari">
          فيراري / Ferrari{" "}
        </option>
        <option className={`text-black bg-white`} value="fiat">
          فئات / Fiat{" "}
        </option>
        <option className={`text-black bg-white`} value="fisker">
          فسكر / Fisker{" "}
        </option>
        <option className={`text-black bg-white`} value="ford">
          فورد / Ford{" "}
        </option>
        <option className={`text-black bg-white`} value="foton">
          فوتون / Foton{" "}
        </option>
        <option className={`text-black bg-white`} value="gac">
          ج اى سي / GAC{" "}
        </option>
        <option className={`text-black bg-white`} value="geely">
          جيلي / Geely{" "}
        </option>
        <option className={`text-black bg-white`} value="genesis">
          جينيسيس / Genesis{" "}
        </option>
        <option className={`text-black bg-white`} value="gmc">
          جي إم سي / GMC{" "}
        </option>
        <option className={`text-black bg-white`} value="great-wall">
          جريت وال / Great Wall{" "}
        </option>
        <option className={`text-black bg-white`} value="haval">
          هافال / Haval{" "}
        </option>
        <option className={`text-black bg-white`} value="honda">
          هوندا / Honda{" "}
        </option>
        <option className={`text-black bg-white`} value="hongqi">
          هونشي / Hongqi{" "}
        </option>
        <option className={`text-black bg-white`} value="hummer">
          هامر / Hummer{" "}
        </option>
        <option className={`text-black bg-white`} value="hyundai">
          هيونداي / Hyundai{" "}
        </option>
        <option className={`text-black bg-white`} value="ineos">
          إينيوس / Ineos{" "}
        </option>
        <option className={`text-black bg-white`} value="infiniti">
          إنفينيتي / Infiniti{" "}
        </option>
        <option className={`text-black bg-white`} value="international">
          انترنتنل / International{" "}
        </option>
        <option className={`text-black bg-white`} value="isuzu">
          إيسوزو / Isuzu{" "}
        </option>
        <option className={`text-black bg-white`} value="jac">
          جك / JAC{" "}
        </option>
        <option className={`text-black bg-white`} value="jaguar">
          جاكوار / Jaguar{" "}
        </option>
        <option className={`text-black bg-white`} value="jeep">
          جيب / Jeep{" "}
        </option>
        <option className={`text-black bg-white`} value="jetour">
          جيتور / Jetour{" "}
        </option>
        <option className={`text-black bg-white`} value="kia">
          كيا / Kia{" "}
        </option>
        <option className={`text-black bg-white`} value="king-long">
          كينج لونج / King Long{" "}
        </option>
        <option className={`text-black bg-white`} value="koenigsegg">
          كونيجسج / Koenigsegg{" "}
        </option>
        <option className={`text-black bg-white`} value="ktm">
          كي تي إم / KTM{" "}
        </option>
        <option className={`text-black bg-white`} value="lamborghini">
          لمبورجيني / Lamborghini{" "}
        </option>
        <option className={`text-black bg-white`} value="land-rover">
          لاند روفر / Land Rover{" "}
        </option>
        <option className={`text-black bg-white`} value="lexus">
          لكزس / Lexus{" "}
        </option>
        <option className={`text-black bg-white`} value="lincoln">
          لينكولن / Lincoln{" "}
        </option>
        <option className={`text-black bg-white`} value="lotus">
          لوتس / Lotus{" "}
        </option>
        <option className={`text-black bg-white`} value="luxgen">
          لوكسجن / Luxgen{" "}
        </option>
        <option className={`text-black bg-white`} value="lynk-and-co">
          لينك وكو / Lynk and Co{" "}
        </option>
        <option className={`text-black bg-white`} value="mahindra">
          ماهيندرا / Mahindra{" "}
        </option>
        <option className={`text-black bg-white`} value="maserati">
          مازيراتي / Maserati{" "}
        </option>
        <option className={`text-black bg-white`} value="maxus">
          ماكسس / Maxus{" "}
        </option>
        <option className={`text-black bg-white`} value="maybach">
          مايباش / Maybach{" "}
        </option>
        <option className={`text-black bg-white`} value="mazda">
          مازدا / Mazda{" "}
        </option>
        <option className={`text-black bg-white`} value="mclaren">
          ماكلارين / McLaren{" "}
        </option>
        <option className={`text-black bg-white`} value="mercedes-benz">
          مرسيدس بنز / Mercedes-Benz{" "}
        </option>
        <option className={`text-black bg-white`} value="mercury">
          ميركوري / Mercury{" "}
        </option>
        <option className={`text-black bg-white`} value="mg">
          أم جي / MG{" "}
        </option>
        <option className={`text-black bg-white`} value="mini">
          ميني / Mini{" "}
        </option>
        <option className={`text-black bg-white`} value="mitsubishi">
          ميتسوبيشي / Mitsubishi{" "}
        </option>
        <option className={`text-black bg-white`} value="morgan">
          مورجان​ / Morgan{" "}
        </option>
        <option className={`text-black bg-white`} value="nissan">
          نيسان / Nissan{" "}
        </option>
        <option className={`text-black bg-white`} value="noble">
          نبل / Noble{" "}
        </option>
        <option className={`text-black bg-white`} value="omoda">
          عمودا / Omoda{" "}
        </option>
        <option className={`text-black bg-white`} value="opel">
          أوبل / Opel{" "}
        </option>
        <option className={`text-black bg-white`} value="oullim">
          عليم / Oullim{" "}
        </option>
        <option className={`text-black bg-white`} value="pagani">
          باجاني / Pagani{" "}
        </option>
        <option className={`text-black bg-white`} value="peugeot">
          بيجو / Peugeot{" "}
        </option>
        <option className={`text-black bg-white`} value="pgo">
          بي جي أه / PGO{" "}
        </option>
        <option className={`text-black bg-white`} value="polestar">
          بولستار / Polestar{" "}
        </option>
        <option className={`text-black bg-white`} value="porsche">
          بورشه / Porsche{" "}
        </option>
        <option className={`text-black bg-white`} value="proton">
          بروتون / Proton{" "}
        </option>
        <option className={`text-black bg-white`} value="ram">
          رام / Ram{" "}
        </option>
        <option className={`text-black bg-white`} value="renault">
          رينو / Renault{" "}
        </option>
        <option className={`text-black bg-white`} value="rolls-royce">
          رولز رويس / Rolls Royce{" "}
        </option>
        <option className={`text-black bg-white`} value="saab">
          صعب / Saab{" "}
        </option>
        <option className={`text-black bg-white`} value="seat">
          سات / Seat{" "}
        </option>
        <option className={`text-black bg-white`} value="skoda">
          سكودا / Skoda{" "}
        </option>
        <option className={`text-black bg-white`} value="skywell">
          سكايويل / Skywell{" "}
        </option>
        <option className={`text-black bg-white`} value="soueast">
          ساوايست / Soueast{" "}
        </option>
        <option className={`text-black bg-white`} value="spyker">
          سبايكر / Spyker{" "}
        </option>
        <option className={`text-black bg-white`} value="ssangyong">
          سانج يونج / Ssangyong{" "}
        </option>
        <option className={`text-black bg-white`} value="subaru">
          سوبارو / Subaru{" "}
        </option>
        <option className={`text-black bg-white`} value="suzuki">
          سوزوكي / Suzuki{" "}
        </option>
        <option className={`text-black bg-white`} value="tank">
          تانك / Tank{" "}
        </option>
        <option className={`text-black bg-white`} value="tata">
          تاتا / Tata{" "}
        </option>
        <option className={`text-black bg-white`} value="tesla">
          تسلا / Tesla{" "}
        </option>
        <option className={`text-black bg-white`} value="toyota">
          تويوتا / Toyota{" "}
        </option>
        <option className={`text-black bg-white`} value="volkswagen">
          فولكس فاجن / Volkswagen{" "}
        </option>
        <option className={`text-black bg-white`} value="volvo">
          فولفو / Volvo{" "}
        </option>
        <option className={`text-black bg-white`} value="zna">
          زي إن أى / ZNA{" "}
        </option>
        <option className={`text-black bg-white`} value="zotye">
          زوتي / Zotye{" "}
        </option>
      </select>
    </div>
  );
};

export default BrandSelector;

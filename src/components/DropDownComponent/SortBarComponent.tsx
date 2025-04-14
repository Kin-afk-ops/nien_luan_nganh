import React, { useEffect, useState } from 'react'
import DropdownWrapper from './DropdowmWrapper'
import { FaTruck, FaCoins } from "react-icons/fa";
import "./sidebarDropdown.css";
import { priceData, statusData, clothSize } from '../../data/sortData';
import axiosInstance from '@/helpers/api/config';
import { categoryModel } from '@/models/CategoryModel';
import Link from 'next/link';
import {useGlobalState} from '../../data/stateStore';
import { CategoryAttribute } from '@/models/attributesModel';


interface Props {
    categoryId?: number;
    onChange?: () => void;
}

const SortBarComponent = (props: Props) => {
    const { categoryId, onChange } = props;
    const {setFilter, removeFilter, isResetFilterList,filterList} = useGlobalState();

    const [offer, setOffer] = useState('');
    const [isFreeCost, setIsFreeCost] = useState('')
    const [price, setPrice] = useState('Tất cả');
    const [status, setStatus] = useState('');
    const [size, setSize] = useState('');
    const [categories, setCategories] = useState<categoryModel[]>();
    const [attributes, setAttributes] = useState<CategoryAttribute>();
    const [showAll, setShowAll] = useState(false);
    const visibleAttributes = showAll ? attributes?.listDataTypes : attributes?.listDataTypes.slice(0, 1);
    useEffect(() => {
        
            setOffer('');
            setPrice('');
            setStatus('');
            setSize('');
    },[isResetFilterList])

    useEffect(() => {
        if(filterList.price === '') setPrice('Tất cả');
        if(filterList.status === '') setStatus('');
        if(filterList.size === '') setSize('');
        if(!('freeCost' in filterList)) setIsFreeCost('');
    },[filterList]);

    useEffect(() => {
        if(filterList['freeCost'] === 'freeCost') setIsFreeCost('freeCost');
    },[filterList['freeCost']])

    const handleSetOffer = (value: string) => {
            const newOffer = offer === value ? "" : value;
            setFilter('isFreeShip', newOffer);
            setOffer(newOffer);
    }

    const handleSetFreeCost = (value: string) => {
        const newFreeCost = isFreeCost === value ? "" : value;
        setFilter('freeCost', newFreeCost);
        setIsFreeCost(newFreeCost);
    }
    const handleSetPrice = (value: string) => {
        const newPrice = price === value ? "" : value;
        setFilter('price', newPrice);
        setPrice(newPrice);
    }
    const handleSetStatus = (value: string) => {
        const newStatus = status === value ? "" : value;
        setFilter('status', newStatus);
        setStatus(newStatus);
    }
    
    const handleSelectAttributes = (name: string, value: string) => {
        if(filterList[name]?.includes(value)){
            removeFilter(name);
        } else {
            setFilter(name, value);
        }
    }
    useEffect(() => {
        const fetchCategory = async () => {
          await axiosInstance.get(`/categories/list/${categoryId}`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
        };
        fetchCategory();
      }, [categoryId]);
    
    useEffect(() => {
        if (!categoryId) return;
        const fetchAttributes = async () => {
            await axiosInstance.get(`/categories/attributes/${categoryId}`)
              .then((res) => setAttributes(res.data))
              .catch((err) => console.log(err));
            }; 
        fetchAttributes();
      
    }, [categoryId]);

  return (
    <div>
        <DropdownWrapper label='Ưu đãi'>
            <ul>
                <li>
                    <label className='checkbox_label'>
                        <input type="checkbox" checked={offer === 'freeship'} onChange={() => handleSetOffer("freeship")}/>
                        <div className="row_item">
                            <FaTruck size={15} />
                            <p style={{fontSize: 15}}>Freeship</p>
                        </div>
                    </label>
                </li>
                <li>
                <label className='checkbox_label'>
                        <input type="checkbox" checked={isFreeCost === 'freeCost'} onChange={() => handleSetFreeCost('freeCost')}/>
                        <div className="row_item">
                            <FaCoins size={15} />
                            <p style={{fontSize: 15}}>Sản phẩm 0đ</p>
                        </div>
                    </label>
                </li>
            </ul>
        </DropdownWrapper>
        <DropdownWrapper label='Danh mục'>
            <ul>
                {categories?.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${item.slug}?id=${item.id}`}><p style={{fontSize: 15}}>{item.name}</p></Link>
                    </li>))}
            </ul>
        </DropdownWrapper>
        <DropdownWrapper label='Giá'>
            <ul>
                {priceData.map((item, index) => (
                    <li key={index}>
                        <label className='checkbox_label price'>
                            <input type="checkbox" checked={filterList.price === item.label} onChange={() => handleSetPrice(item.label)}/>
                            <p style={{fontSize: 15}}>{item.label}</p>
                        </label>
                    </li>))}
            </ul>
        </DropdownWrapper>
        <DropdownWrapper label='Tình trạng'>
            <ul>
                {statusData.map((item, index) => (
                    <li key={index}>
                        <label className='checkbox_label'>
                            <input type="checkbox" checked={filterList.status === item.label} onChange={() => handleSetStatus(item.label)}/>
                            <p style={{fontSize: 15}}>{item.label}</p>
                        </label>
                    </li>))}
            </ul>
        </DropdownWrapper>
        {/* <DropdownWrapper label='Kích thước'>
            <ul>
                {clothSize.map((item, index) => (
                    <li key={index}>
                        <label className='checkbox_label'>
                            <input type="checkbox" checked={size === item.label} onChange={() => handleSetSize(item.label)}/>
                            <p style={{fontSize: 15}}>{item.label}</p>
                        </label>
                    </li>))}
            </ul>
        </DropdownWrapper> */}
        <div>
            {visibleAttributes?.map((item, index) => (
                <DropdownWrapper key={index} label={item.label}>
                    <ul>
                        {item.options.map((option, idx) => (
                            <li key={idx}>
                                <label className='checkbox_label'>
                                    <input type="checkbox" 
                                        checked={filterList[item.name]===(option.value)}
                                        onChange={() => handleSelectAttributes(item.name, option.value)}
                                    />
                                    <p style={{fontSize: 15}}>{option.value}</p>
                                </label>
                            </li>))}
                    </ul>
                </DropdownWrapper>
            ))}
            
        </div>
        <div className="show_all_button" onClick={() => setShowAll(!showAll)}>
                <p>{`${showAll ? "Thu gọn"  : "Xem thêm"}`}</p>
        </div>
    </div>
  )
}

export default SortBarComponent
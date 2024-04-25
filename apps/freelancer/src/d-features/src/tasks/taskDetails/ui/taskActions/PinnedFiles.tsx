/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// import { Color, typography } from "@freelbee/shared/ui-kit";
// import { FormRowGrid } from "../FormGrid";
// import styled from "styled-components";
// import { ActionFiles, FileAction, TaskFileDto, UserRole } from "@freelbee/entities";
// import { FileHelper } from "@freelbee/shared/helpers";
// import { useRef } from "react";

// interface Props {
//     files: Array<TaskFileDto>,
//     setFiles: (files: Array<TaskFileDto>) => void
// } 

// export const PinnedFiles = ({files, setFiles}: Props) => {

//     const leftFileRef = useRef<any>();
//     const rightFileRef = useRef<any>();
    
//     const getRightSide = (file: TaskFileDto & ActionFiles) => {
//         const onClick = file.action === FileAction.DELETE ? () => setFileAction(file, FileAction.NO_ACTION) : () => downloadFile(file.file.id);
//         const color = file.action === FileAction.DELETE ? Color.DEFAULT_BLUE : Color.EMERALD;

//         return (
//             <FileRightSide ref={rightFileRef}
//                 onMouseMove={e => onMoseMoveOrOut(e, color, 2)}
//                 onMouseOut={e => onMoseMoveOrOut(e, '', 0)}
//                 onClick={onClick}
//             />
//         );
//     };

//     const onMoseMoveOrOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, color: Color | '', rotate: number) => {
//         e!.currentTarget!.parentElement!.style.background = color;
//         e!.currentTarget!.parentElement!.style.transform = `rotate(${rotate}deg)`;
//     };

//     const onDropHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();

//         const newFiles = e.target!.files!;

//         for(let i = 0; i < newFiles.length; i++) {
//             const file = newFiles[i];
//             if(newFiles[i].size > 5_242_880 || !Helper.hasNotInvalidSymbols(file.name)) {
//                 // TODO: add error
//                 continue;
//             }
//             const payload = await FileHelper.getBase64(file);
//             setFiles(prev => [...prev, {
//                 id: (new Date().getTime() + i),
//                 name: file.name,
//                 payload: payload
//             }]);
//         }
//         e.target.value = '';
//     };

//     const setFileAction = (file: TaskFileDto & ActionFiles, action: FileAction) => {
//         setFiles(p => p.map(df => ({
//             ...df,
//             action: df.file.id !== file.file.id ? file.action : action
//         }))
//         );
//     };

//     const removeNewFile = (id: number) => {
//         setFiles(p => p.filter(f => f.id !== id));
//     };

//     const downloadFile = async (id: string | number) => {
//         // const res = await taskApiService.downloadFileByTaskId(displayedTask!.id, id);
//         // if(res.isSuccess()) Helper.downloadFileFromOctetStream(res);
//     }

//   return (
//     <FormRowGrid>
//     {files.filter(f => f.userRole === UserRole.COMPANY).length !== 0 && (
//         <FormRowGrid>
//             <Text font='bodyMedium'>
//                 Files attached by Contractor
//             </Text>
//             <PinedFiles>
//                 {/* {files.filter(file => file.userRole === UserRole.COMPANY && file.action !== FileAction.DELETE).map(file => (
//                     <File
//                         key={file.file.id}
//                         title={file?.file?.name}
//                     >
//                         {getRightSide(file)}
//                         <FileIcon/>
//                         <Text>{FileHelper.getFileName(file.name)}</Text>
//                         <DownLoadIcon/>
//                     </File>
//                 ))} */}
//             </PinedFiles>
//         </FormRowGrid>
//     )}

//     {files.filter(f => f.userRole === UserRole.FREELANCER).length !== 0 && (
//         <FormRowGrid>
//             <Text font='heading3' color={Color.GRAY_800}>
//                 Files attached by you
//             </Text>
//             <PinedFiles>
//                 {files.filter(file => file.userRole === UserRole.FREELANCER).map(file => (
//                     <File
//                         key={file?.id}
//                         title={file?.fileName}
//                     >
//                         <FileLeftSide
//                             ref={leftFileRef}
//                             onMouseMove={e => onMoseMoveOrOut(e, Color.BG_RED, -2)}
//                             onMouseOut={e => onMoseMoveOrOut(e, '', 0)}
//                             onClick={()=>setFileAction(file, FileAction.DELETE)}
//                         />
//                         {getRightSide(file)}
//                         <RemoveIcon/>
//                         {FileHelper.getFileName(file?.fileName)}
//                         <DownLoadIcon/>
//                     </File>
//                 ))}
//             </PinedFiles>
//         </FormRowGrid>
//     )}

//     {
//         files?.filter(file => file.canRemove && file.action === FileAction.DELETE).length > 0 && (
//             <FormRowGrid>
//                 <Text font='body' color={Color.GRAY_600}>
//                     Files for deletion
//                 </Text>
//                 <PinedFiles>
//                     {files.filter(file => file.canRemove && file.action === FileAction.DELETE).map(file => (
//                         <File
//                             key={file.id}
//                             title={file?.fileName}
//                         >
//                             <FileIcon/>
//                             {FileHelper.getFileName(file?.fileName)}
//                             <BackIcon/>
//                             {getRightSide(file)}
//                         </File>
//                     ))}
//                 </PinedFiles>
//             </FormRowGrid>
//         )
//     }

//     <FormRowGrid>
//         <LoadContainer>
//             <LoadContent>
//                 <PaperClip />
//                 <input type="file" name="file" multiple={true} onChange={(e) => onDropHandler(e)} />
//                 <LoadText >Attach Files</LoadText>
//             </LoadContent>
//         </LoadContainer>
//         <PinedFiles isHide={!files?.length}>
//             {files.map((file) => (
//                 <File key={file.id} title={file?.fileName} >
//                     <FileLeftSide
//                         ref={leftFileRef}
//                         onMouseMove={e => onMoseMoveOrOut(e, Color.BG_RED, -2)}
//                         onMouseOut={e => onMoseMoveOrOut(e, Color.BG_LIGHT_BLUE, 0)}
//                         onClick={()=>removeNewFile(file.id)}
//                     />
//                     <RemoveIcon/>
//                     {FileHelper.getFileName(file?.fileName)}
//                 </File>
//             ))}
//         </PinedFiles>
//     </FormRowGrid>
// </FormRowGrid>
//   )
// }


// const LoadContainer = styled.label`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 15px;
// `;

// const LoadContent = styled.div`
//     position: relative;
//     cursor: pointer;
//     width: max-content;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 15px;
//     input[type=file]{
//         position: absolute;
//         z-index: -1;
//         opacity: 0;
//         display: block;
//         width: 0;
//         height: 0;
//     }
// `;

// const PaperClip = styled.div`
//   background: url("/icons/account/company-account/createTask/paperClip.svg") center
//   center no-repeat;
//   height: 18px;
//   width: 18px;
//   background-size: contain;
// `;

// const LoadText = styled.div`
//     ${typography.body};
//   position: relative;
//   display: inline-block;
//   cursor: pointer;
//   outline: none;
//   color: ${Color.BLUE};
//   text-decoration: none;
//   vertical-align: middle;
//   text-align: center;
//   border-radius: 4px;
//   box-sizing: border-box;
//   border: none;
//   margin: 0;
//   transition: background-color 0.2s;
// `;


// const PinedFiles = styled.div<{isHide?: boolean}>`
//   max-width: 100%;  
//   display: ${({isHide}) => isHide ? 'none' : 'flex'};
//   flex-wrap: wrap;
//   gap: 5px;
//   border: 1px solid #d7d8de;
//   border-radius: 10px;
//   padding: 10px;
//   overflow-y: scroll;
//   max-height: 400px;
//   -ms-overflow-style: none; /* IE 11 */
//   scrollbar-width: none; /* Firefox 64 */

//   &::-webkit-scrollbar {
//     width: 10px;
//     background-color: transparent;
//   }

//   &::-webkit-scrollbar-thumb {
//     border-radius: 5px;
//     background-color: ${Color.GRAY_400};
//     background-position: center;
//     background-repeat: no-repeat;
//     height: 5px;
//   }
// `;

// const File = styled.div`
//   position: relative;
//   cursor: pointer;
//   background: #f1f4f4;
//   border-radius: 10px;
//   padding: 8px; 
//   display: flex;
//   gap: 5px;
//   align-items: center;
//   transition: .5s;
//   max-width: 230px;
//   min-width: 60px;
//   overflow: hidden;
// `;

// const FileLeftSide = styled.div`
//   position: absolute;
//   width: 50%;
//   height: 100%;
//   left: 0;
//   top: 0;
// `;

// const FileRightSide = styled.div`
//   position: absolute;
//   width: 50%;
//   height: 100%;
//   right: 0;
//   top: 0;
// `;

// const RemoveIcon = styled.div`
//   background-image: url("/icons/baseUI/trash/trash.svg");
//   background-repeat: no-repeat;
//   background-position: center center;
//   border-radius: 20px;
//   width: 20px;
//   height: 20px;
// `;

// const FileIcon = styled.div`
//   background-image: url("/icons/account/task/file.svg");
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-position: center center;
//   min-width: 20px;
//   min-height: 20px;
// `;

// const DownLoadIcon = styled.div`
//   background-image: url("/icons/account/download-alt.svg");
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-size: contain;
//   width: 20px;
//   height: 20px;
// `;

// const BackIcon = styled.div`
//   background-image: url("/icons/account/back-2.svg");
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-size: contain;
//   width: 20px;
//   height: 20px;
// `;
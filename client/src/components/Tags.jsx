// import React, { Component } from 'react'
// import styled from 'styled-components'
// import '../style/tags.css'

// class InputTag extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tags: [
//         'Sample Tag',
//       ]
//     };
//   }

//   removeTag = (i) => {
//     const newTags = [ ...this.state.tags ];
//     newTags.splice(i, 1);
//     this.setState({ tags: newTags });
//   }

//   inputKeyDown = (e) => {
//     const val = e.target.value;
//     if (e.key === 'Enter' && val) {
//       if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
//         return;
//       }
//       this.setState({ tags: [...this.state.tags, val]});
//       this.tagInput.value = null;
//     } else if (e.key === 'Backspace' && !val) {
//       this.removeTag(this.state.tags.length - 1);
//     }
//   }

//   render() {
//     const { tags } = this.state;

//     return (
//       <div className="input-tag">
//         <ul className="input-tag__tags">
//           { tags.map((tag, i) => (
//             <li key={tag}>
//               {tag}
//               <button type="button" className="no-outline" onClick={() => { this.removeTag(i); }}>+</button>
//             </li>
//           ))}
//           <li className="input-tag__tags__input"><input type="text" placeholder="Tag it!" className="no-outline" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
//         </ul>
//       </div>
//     );
//   }
// }

// class Tags extends Component {
//     render() {
//         return (
//                 <InputTag />
//         )
//     }
// }

// export default Tags

// // const InputTag = () => {
// //   // Using the State hook to declare our tags variable and setTags to update the variable.
// //   const [tags, setTags] = React.useState([
// //     'Tags',
// //     'Input'
// //   ]);

// //   const removeTag = (i) => {
// //     const newTags = [ ...tags ];
// //     newTags.splice(i, 1);

// //     // Call the defined function setTags which will replace tags with the new value.
// //     setTags(newTags);
// //   };

// //   const inputKeyDown = (e) => {
// //     const val = e.target.value;
// //     if (e.key === 'Enter' && val) {
// //       if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
// //         return;
// //       }
// //       setTags([...tags, val]);
// //       tagInput.value = null;
// //     } else if (e.key === 'Backspace' && !val) {
// //       removeTag(tags.length - 1);
// //     }
// //   };

// //   return (
// //     <div className="input-tag">
// //       <ul className="input-tag__tags">
// //         { tags.map((tag, i) => (
// //           <li key={tag}>
// //             {tag}
// //             <button type="button" onClick={() => { removeTag(i); }}>+</button>
// //           </li>
// //         ))}
// //         <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c; }} /></li>
// //       </ul>
// //     </div>
// //   );
// // }

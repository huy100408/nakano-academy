// Whiteboard widget registry: `type` in course data → component. Contract in src/data/curriculum/README.md.
import Annotate from './Annotate.jsx'
import Balancer from './Balancer.jsx'
import BigO from './BigO.jsx'
import Binary from './Binary.jsx'
import BoardQuiz from './BoardQuiz.jsx'
import Bohr from './Bohr.jsx'
import CoordPlane from './CoordPlane.jsx'
import Diffusion from './Diffusion.jsx'
import Dtm from './Dtm.jsx'
import Forces from './Forces.jsx'
import Gerrymander from './Gerrymander.jsx'
import LogicGates from './LogicGates.jsx'
import Pyramid from './Pyramid.jsx'
import Search from './Search.jsx'
import UrbanModels from './UrbanModels.jsx'
import VonThunen from './VonThunen.jsx'

export const WIDGETS = {
  dtm: { C: Dtm, label: 'Demographic Transition Model' },
  pyramid: { C: Pyramid, label: 'Population pyramid' },
  vonThunen: { C: VonThunen, label: 'Von Thünen & bid-rent' },
  diffusion: { C: Diffusion, label: 'Diffusion simulator' },
  urbanModels: { C: UrbanModels, label: 'Urban models' },
  gerrymander: { C: Gerrymander, label: 'Gerrymandering grid' },
  binary: { C: Binary, label: '8-bit binary' },
  logicGates: { C: LogicGates, label: 'Logic gates' },
  search: { C: Search, label: 'Search visualizer' },
  bigO: { C: BigO, label: 'Big-O growth' },
  coordPlane: { C: CoordPlane, label: 'Coordinate plane' },
  forces: { C: Forces, label: 'Forces & motion' },
  bohr: { C: Bohr, label: 'Bohr atom builder' },
  balancer: { C: Balancer, label: 'Equation balancer' },
  annotate: { C: Annotate, label: 'Annotation board' },
  boardQuiz: { C: BoardQuiz, label: 'Board question' },
}

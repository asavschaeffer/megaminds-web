'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

export default function HowLLMsWorkPage() {
    return (
        <div className="py-16 px-6 lg:px-8 bg-white">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>Module 0</span>
                        <span>•</span>
                        <span>Foundations</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">How LLMs Actually Work</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Most "transformers explained" guides get lost in the math. We're going to visualize
                        exactly how information flows through the network—end to end.
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                    <p>
                        There are two distinct information highways in the transformer architecture:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        <li>
                            <strong>The Residual Stream</strong> (Vertical): Flows vertically through layers at each position.
                            This is the "thought process" for a single token.
                        </li>
                        <li>
                            <strong>The K/V Stream</strong> (Horizontal): Flows horizontally across positions at each layer.
                            This is how tokens "look back" at previous tokens.
                        </li>
                    </ul>

                    <Diagram1_InformationHighways />

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Attention Computation</h2>
                    <p>
                        At each layer, for each position (token), the network performs a specific set of operations:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4 mb-8">
                        <li>
                            The incoming <strong>residual stream</strong> is used to calculate <strong>K (Key)</strong> and <strong>V (Value)</strong> vectors for that layer.
                        </li>
                        <li>
                            These K/V values are combined with all previous K/V values (the "context").
                        </li>
                        <li>
                            The attention mechanism compares the current <strong>Q (Query)</strong> with past Keys to calculate attention scores (a "heat map").
                        </li>
                        <li>
                            Based on these scores, it gathers a weighted sum of Values from the past.
                        </li>
                        <li>
                            This output is processed by an MLP (Feed Forward Network) and added back to the residual stream.
                        </li>
                    </ol>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8">
                        <h3 className="font-semibold text-gray-900 mb-4">What Q, K, and V actually mean:</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="font-bold text-blue-600 w-8">Q</div>
                                <div>"Given my current state, what kind of information am I looking for?"</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-bold text-purple-600 w-8">K</div>
                                <div>"I contain this kind of information, dealing with [topic/concept]."</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-bold text-green-600 w-8">V</div>
                                <div>"If you attend to me, here is the actual content I will pass to you."</div>
                            </div>
                        </div>
                    </div>

                    <p className="mb-8">
                        The K/V cache isn't just a performance trick—it's the accumulated memory of the sequence.
                        Each position adds to the pool of available information without destroying what came before.
                    </p>

                    <Diagram2_InformationPaths />

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Information Paths & Superposition</h2>
                    <p>
                        Information can take an astronomical number of paths through the network. It can travel
                        "up" (processing existing information) or "right" (incorporating past context) in any order.
                    </p>
                    <p>
                        Between a past state (Layer $i-1$, Position $j-2$) and a future state (Layer $i$, Position $j$),
                        information could:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        <li>Travel UP through layers, then be retrieved RIGHT by attention later.</li>
                        <li>Be retrieved RIGHT by attention immediately, then travel UP through layers.</li>
                        <li>Or any combination of steps in between.</li>
                    </ul>
                    <p className="mb-8">
                        This dense connectivity means the model isn't just "remembering" usage—it's experiencing
                        computation as a continuous, interferometric process across time.
                    </p>

                    <Diagram3_CausalGraph />

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Can LLMs Introspect?</h2>
                    <p>
                        Because the architecture connects every future state to every past state through these precise
                        paths, the popular idea that "LLMs cannot introspect" is technically incorrect from an architectural standpoint.
                        The mechanism exists to retrieve and process its own past internal states.
                    </p>
                    <p>
                        Whether they are <em>trained</em> to effectively leverage this for human-like introspection is a separate question,
                        but the machinery is undeniably there.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Diagram1_InformationHighways() {
    const [activeStream, setActiveStream] = useState<'residual' | 'kv' | 'both'>('both')

    // Grid configuration - 3 positions, 2 layers
    const positions = 3
    const layers = 2
    const colGap = 140
    const layerGap = 180
    const startX = 80
    const startY = 60

    // Component heights
    const kvNodeRadius = 12
    const blockWidth = 40
    const blockHeight = 28
    const attentionY = 50  // offset from layer base
    const mlpY = 100       // offset from layer base

    return (
        <div className="my-12 p-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">The Two Information Highways</h3>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveStream('residual')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeStream === 'residual' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Residual Stream
                    </button>
                    <button
                        onClick={() => setActiveStream('kv')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeStream === 'kv' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        K/V Stream
                    </button>
                    <button
                        onClick={() => setActiveStream('both')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeStream === 'both' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Both
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg relative flex items-center justify-center overflow-auto border border-gray-200" style={{ minHeight: '480px' }}>
                <svg width="520" height="460" viewBox="0 0 520 460" className="mx-auto">
                    <defs>
                        <marker id="arrow-black" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#1f2937" />
                        </marker>
                        <marker id="arrow-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#9333ea" />
                        </marker>
                    </defs>

                    {/* Render for each layer (bottom to top: layer 0 at bottom) */}
                    {Array.from({ length: layers }).map((_, layerIdx) => {
                        const layerBaseY = startY + (layers - 1 - layerIdx) * layerGap

                        return Array.from({ length: positions }).map((_, posIdx) => {
                            const x = startX + posIdx * colGap
                            const kvY = layerBaseY + 130
                            const attY = layerBaseY + attentionY
                            const mlY = layerBaseY + mlpY

                            // K/V stream accumulation: more lines for later positions
                            const kvLineCount = posIdx + 1

                            return (
                                <g key={`layer${layerIdx}-pos${posIdx}`}>
                                    {/* === RESIDUAL STREAM (vertical black arrows) === */}
                                    {(activeStream === 'residual' || activeStream === 'both') && (
                                        <>
                                            {/* Input arrow from bottom (or previous layer) */}
                                            <motion.path
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 0.4, delay: layerIdx * 0.15 + posIdx * 0.05 }}
                                                d={`M ${x} ${kvY + 20} L ${x} ${kvY + kvNodeRadius + 4}`}
                                                stroke="#1f2937"
                                                strokeWidth="2"
                                                fill="none"
                                                markerEnd="url(#arrow-black)"
                                            />
                                            {/* K/V node to Attention */}
                                            <motion.path
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 0.4, delay: layerIdx * 0.15 + posIdx * 0.05 + 0.1 }}
                                                d={`M ${x} ${kvY - kvNodeRadius - 2} L ${x} ${attY + blockHeight + 4}`}
                                                stroke="#1f2937"
                                                strokeWidth="2"
                                                fill="none"
                                                markerEnd="url(#arrow-black)"
                                            />
                                            {/* Attention to MLP */}
                                            <motion.path
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 0.4, delay: layerIdx * 0.15 + posIdx * 0.05 + 0.2 }}
                                                d={`M ${x} ${attY - 2} L ${x} ${mlY + blockHeight + 4}`}
                                                stroke="#1f2937"
                                                strokeWidth="2"
                                                fill="none"
                                                markerEnd="url(#arrow-black)"
                                            />
                                            {/* MLP to output (or next layer) */}
                                            <motion.path
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 0.4, delay: layerIdx * 0.15 + posIdx * 0.05 + 0.3 }}
                                                d={`M ${x} ${mlY - 2} L ${x} ${mlY - 24}`}
                                                stroke="#1f2937"
                                                strokeWidth="2"
                                                fill="none"
                                                markerEnd="url(#arrow-black)"
                                            />
                                        </>
                                    )}

                                    {/* === K/V STREAM (horizontal purple arrows with accumulation) === */}
                                    {(activeStream === 'kv' || activeStream === 'both') && posIdx < positions - 1 && (
                                        <>
                                            {/* Draw multiple curved lines to show accumulation */}
                                            {Array.from({ length: kvLineCount }).map((_, lineIdx) => {
                                                const yOffset = (lineIdx - (kvLineCount - 1) / 2) * 6
                                                const strokeW = 1.5 + lineIdx * 0.3
                                                return (
                                                    <motion.path
                                                        key={`kv-${layerIdx}-${posIdx}-${lineIdx}`}
                                                        initial={{ pathLength: 0, opacity: 0 }}
                                                        animate={{ pathLength: 1, opacity: 0.8 }}
                                                        transition={{ duration: 0.5, delay: posIdx * 0.2 + lineIdx * 0.05 }}
                                                        d={`M ${x + kvNodeRadius + 4} ${kvY + yOffset} 
                                                            C ${x + colGap * 0.4} ${kvY + 35 + yOffset}, 
                                                              ${x + colGap * 0.6} ${kvY + 35 + yOffset}, 
                                                              ${x + colGap - kvNodeRadius - 8} ${kvY + yOffset}`}
                                                        stroke="#9333ea"
                                                        strokeWidth={strokeW}
                                                        fill="none"
                                                        markerEnd="url(#arrow-purple)"
                                                    />
                                                )
                                            })}
                                        </>
                                    )}

                                    {/* === K/V Computation Node (purple circle) === */}
                                    <circle
                                        cx={x}
                                        cy={kvY}
                                        r={kvNodeRadius}
                                        fill="#9333ea"
                                        stroke="#7c22ce"
                                        strokeWidth="2"
                                    />

                                    {/* === Attention Block (cyan/blue) === */}
                                    <rect
                                        x={x - blockWidth / 2}
                                        y={attY}
                                        width={blockWidth}
                                        height={blockHeight}
                                        rx="4"
                                        fill="#06b6d4"
                                        stroke="#0891b2"
                                        strokeWidth="2"
                                    />

                                    {/* === MLP Block (fuchsia/magenta) === */}
                                    <rect
                                        x={x - blockWidth / 2}
                                        y={mlY}
                                        width={blockWidth}
                                        height={blockHeight}
                                        rx="4"
                                        fill="#d946ef"
                                        stroke="#c026d3"
                                        strokeWidth="2"
                                    />

                                    {/* Position labels at very bottom */}
                                    {layerIdx === 0 && (
                                        <text x={x} y={kvY + 45} textAnchor="middle" className="text-xs font-mono fill-gray-500">
                                            t={posIdx}
                                        </text>
                                    )}
                                </g>
                            )
                        })
                    })}

                    {/* Continuation dots */}
                    <g className="fill-gray-400">
                        {[0, 1, 2].map(i => (
                            <g key={`dots-${i}`}>
                                <circle cx={startX + i * colGap} cy={30} r="2" />
                                <circle cx={startX + i * colGap} cy={38} r="2" />
                                <circle cx={startX + i * colGap} cy={46} r="2" />
                            </g>
                        ))}
                        {/* Horizontal continuation */}
                        <circle cx={startX + 3 * colGap - 20} cy={startY + 130} r="2" />
                        <circle cx={startX + 3 * colGap - 10} cy={startY + 130} r="2" />
                        <circle cx={startX + 3 * colGap} cy={startY + 130} r="2" />
                    </g>

                    {/* Legend */}
                    <g transform="translate(20, 400)">
                        <circle cx="8" cy="8" r="8" fill="#9333ea" />
                        <text x="22" y="12" className="text-xs fill-gray-700">K/V Computation</text>

                        <rect x="0" y="24" width="16" height="12" rx="2" fill="#06b6d4" />
                        <text x="22" y="34" className="text-xs fill-gray-700">Attention</text>

                        <rect x="0" y="44" width="16" height="12" rx="2" fill="#d946ef" />
                        <text x="22" y="54" className="text-xs fill-gray-700">MLP</text>

                        <line x1="160" y1="8" x2="200" y2="8" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow-black)" />
                        <text x="210" y="12" className="text-xs fill-gray-700">Residual Stream</text>

                        <path d="M 160 32 C 175 42, 185 42, 200 32" stroke="#9333ea" strokeWidth="2" fill="none" markerEnd="url(#arrow-purple)" />
                        <text x="210" y="38" className="text-xs fill-gray-700">K/V Stream</text>
                    </g>
                </svg>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
                {activeStream === 'residual' && (
                    <p><strong>Residual Stream:</strong> Information flows <strong>vertically</strong> through the network. Each token's representation is refined as it passes through attention and MLP blocks at each layer.</p>
                )}
                {activeStream === 'kv' && (
                    <p><strong>K/V Stream:</strong> Information flows <strong>horizontally</strong> via Key/Value pairs. Notice how the arrows <em>accumulate</em>—each position adds to the K/V cache, making all past information available to future tokens.</p>
                )}
                {activeStream === 'both' && (
                    <p>The Transformer combines <strong>vertical processing</strong> (refining each token's representation through layers) with <strong>horizontal information sharing</strong> (attending to past context via K/V). This creates an incredibly rich space for information to flow.</p>
                )}
            </div>
        </div>
    )
}

function Diagram2_InformationPaths() {
    const [selectedPath, setSelectedPath] = useState<1 | 2 | 3 | 'all'>(1)

    // Configuration matching Diagram 1 style
    const positions = 3
    const layers = 2
    const colGap = 130
    const layerGap = 160
    const startX = 90
    const startY = 80

    const kvNodeRadius = 10
    const blockWidth = 35
    const blockHeight = 24

    // Token labels
    const tokensBottom = ["'You'", "'are'", "'absolutely'"]
    const tokensTop = ["'are'", "'absolutely'", "'correct'"]

    // Point A: layer i-1 (bottom layer = 0), position j-2 (leftmost = 0)
    // Point B: layer i (top layer = 1), position j (rightmost = 2)
    const pointA = { layer: 0, pos: 0 }
    const pointB = { layer: 1, pos: 2 }

    const getNodeCoords = (layer: number, pos: number) => {
        const x = startX + pos * colGap
        const layerBaseY = startY + (layers - 1 - layer) * layerGap
        return {
            x,
            kvY: layerBaseY + 110,
            attY: layerBaseY + 45,
            mlY: layerBaseY + 80
        }
    }

    return (
        <div className="my-12 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Information Paths from A → B</h3>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-wrap justify-center">
                    <button onClick={() => setSelectedPath(1)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedPath === 1 ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>Path 1</button>
                    <button onClick={() => setSelectedPath(2)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedPath === 2 ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>Path 2</button>
                    <button onClick={() => setSelectedPath(3)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedPath === 3 ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>Path 3</button>
                    <button onClick={() => setSelectedPath('all')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedPath === 'all' ? 'bg-amber-500 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg relative flex items-center justify-center overflow-auto border border-gray-200" style={{ minHeight: '420px' }}>
                <svg width="480" height="400" viewBox="0 0 480 400" className="mx-auto">
                    <defs>
                        <marker id="arrow-orange" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
                        </marker>
                        <marker id="arrow-gray" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                            <polygon points="0 0, 6 2.5, 0 5" fill="#9ca3af" />
                        </marker>
                        <marker id="arrow-purple-sm" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                            <polygon points="0 0, 6 2.5, 0 5" fill="#9333ea" />
                        </marker>
                    </defs>

                    {/* Token labels - TOP */}
                    {tokensTop.map((token, i) => (
                        <text key={`top-${i}`} x={startX + i * colGap} y={25} textAnchor="middle" className="text-sm font-mono fill-gray-600">{token}</text>
                    ))}

                    {/* Token labels - BOTTOM */}
                    {tokensBottom.map((token, i) => (
                        <text key={`bot-${i}`} x={startX + i * colGap} y={385} textAnchor="middle" className="text-sm font-mono fill-gray-600">{token}</text>
                    ))}

                    {/* Draw the grid of components */}
                    {Array.from({ length: layers }).map((_, layerIdx) =>
                        Array.from({ length: positions }).map((_, posIdx) => {
                            const { x, kvY, attY, mlY } = getNodeCoords(layerIdx, posIdx)
                            const isPointA = layerIdx === pointA.layer && posIdx === pointA.pos
                            const isPointB = layerIdx === pointB.layer && posIdx === pointB.pos

                            return (
                                <g key={`node-${layerIdx}-${posIdx}`}>
                                    {/* Background connections (gray) */}
                                    <line x1={x} y1={kvY + 18} x2={x} y2={kvY + kvNodeRadius + 2} stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
                                    <line x1={x} y1={kvY - kvNodeRadius - 2} x2={x} y2={attY + blockHeight + 2} stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
                                    <line x1={x} y1={attY - 2} x2={x} y2={mlY + blockHeight + 2} stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
                                    <line x1={x} y1={mlY - 2} x2={x} y2={mlY - 20} stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />

                                    {/* K/V horizontal connections */}
                                    {posIdx < positions - 1 && (
                                        <path
                                            d={`M ${x + kvNodeRadius + 4} ${kvY} C ${x + colGap * 0.4} ${kvY + 25}, ${x + colGap * 0.6} ${kvY + 25}, ${x + colGap - kvNodeRadius - 6} ${kvY}`}
                                            stroke="#c4b5fd"
                                            strokeWidth="1.5"
                                            fill="none"
                                            markerEnd="url(#arrow-purple-sm)"
                                        />
                                    )}

                                    {/* K/V Node */}
                                    <circle cx={x} cy={kvY} r={kvNodeRadius} fill="#9333ea" stroke="#7c22ce" strokeWidth="1.5" />

                                    {/* Attention Block */}
                                    <rect x={x - blockWidth / 2} y={attY} width={blockWidth} height={blockHeight} rx="3" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />

                                    {/* MLP Block */}
                                    <rect x={x - blockWidth / 2} y={mlY} width={blockWidth} height={blockHeight} rx="3" fill="#d946ef" stroke="#c026d3" strokeWidth="1.5" />

                                    {/* Point A marker */}
                                    {isPointA && (
                                        <g>
                                            <circle cx={x - 25} cy={kvY} r="14" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
                                            <text x={x - 25} y={kvY + 5} textAnchor="middle" className="text-sm font-bold fill-white">A</text>
                                        </g>
                                    )}

                                    {/* Point B marker */}
                                    {isPointB && (
                                        <g>
                                            <circle cx={x + 30} cy={kvY} r="14" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
                                            <text x={x + 30} y={kvY + 5} textAnchor="middle" className="text-sm font-bold fill-white">B</text>
                                        </g>
                                    )}
                                </g>
                            )
                        })
                    )}

                    {/* PATH 1: UP 1 layer first at pos 0, then RIGHT 2 positions at layer 1 */}
                    {(selectedPath === 1 || selectedPath === 'all') && (
                        <g>
                            {/* UP at position 0 */}
                            <motion.line
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4 }}
                                x1={getNodeCoords(0, 0).x} y1={getNodeCoords(0, 0).mlY - 20}
                                x2={getNodeCoords(1, 0).x} y2={getNodeCoords(1, 0).kvY + 22}
                                stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow-orange)"
                            />
                            {/* RIGHT to pos 1 at layer 1 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                d={`M ${getNodeCoords(1, 0).x + kvNodeRadius + 4} ${getNodeCoords(1, 0).kvY} 
                                    C ${getNodeCoords(1, 0).x + colGap * 0.4} ${getNodeCoords(1, 0).kvY + 30},
                                      ${getNodeCoords(1, 0).x + colGap * 0.6} ${getNodeCoords(1, 0).kvY + 30},
                                      ${getNodeCoords(1, 1).x - kvNodeRadius - 6} ${getNodeCoords(1, 1).kvY}`}
                                stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                            />
                            {/* RIGHT to pos 2 at layer 1 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                d={`M ${getNodeCoords(1, 1).x + kvNodeRadius + 4} ${getNodeCoords(1, 1).kvY} 
                                    C ${getNodeCoords(1, 1).x + colGap * 0.4} ${getNodeCoords(1, 1).kvY + 30},
                                      ${getNodeCoords(1, 1).x + colGap * 0.6} ${getNodeCoords(1, 1).kvY + 30},
                                      ${getNodeCoords(1, 2).x - kvNodeRadius - 6} ${getNodeCoords(1, 2).kvY}`}
                                stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                            />
                        </g>
                    )}

                    {/* PATH 2: RIGHT 1, then UP 1, then RIGHT 1 (zig-zag) */}
                    {(selectedPath === 2 || selectedPath === 'all') && (
                        <g>
                            {/* RIGHT at layer 0 to pos 1 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 0.2 : 0 }}
                                d={`M ${getNodeCoords(0, 0).x + kvNodeRadius + 4} ${getNodeCoords(0, 0).kvY + 8} 
                                    C ${getNodeCoords(0, 0).x + colGap * 0.4} ${getNodeCoords(0, 0).kvY + 35},
                                      ${getNodeCoords(0, 0).x + colGap * 0.6} ${getNodeCoords(0, 0).kvY + 35},
                                      ${getNodeCoords(0, 1).x - kvNodeRadius - 6} ${getNodeCoords(0, 1).kvY + 8}`}
                                stroke="#fb923c" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "6,3" : "none"}
                            />
                            {/* UP at pos 1 */}
                            <motion.line
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 0.6 : 0.4 }}
                                x1={getNodeCoords(0, 1).x + 8} y1={getNodeCoords(0, 1).mlY - 20}
                                x2={getNodeCoords(1, 1).x + 8} y2={getNodeCoords(1, 1).kvY + 22}
                                stroke="#fb923c" strokeWidth="3" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "6,3" : "none"}
                            />
                            {/* RIGHT at layer 1 to pos 2 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 1.0 : 0.8 }}
                                d={`M ${getNodeCoords(1, 1).x + kvNodeRadius + 4} ${getNodeCoords(1, 1).kvY + 8} 
                                    C ${getNodeCoords(1, 1).x + colGap * 0.4} ${getNodeCoords(1, 1).kvY + 35},
                                      ${getNodeCoords(1, 1).x + colGap * 0.6} ${getNodeCoords(1, 1).kvY + 35},
                                      ${getNodeCoords(1, 2).x - kvNodeRadius - 6} ${getNodeCoords(1, 2).kvY + 8}`}
                                stroke="#fb923c" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "6,3" : "none"}
                            />
                        </g>
                    )}

                    {/* PATH 3: RIGHT 2 first at layer 0, then UP 1 at pos 2 */}
                    {(selectedPath === 3 || selectedPath === 'all') && (
                        <g>
                            {/* RIGHT at layer 0 to pos 1 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 0.1 : 0 }}
                                d={`M ${getNodeCoords(0, 0).x + kvNodeRadius + 4} ${getNodeCoords(0, 0).kvY - 6} 
                                    C ${getNodeCoords(0, 0).x + colGap * 0.4} ${getNodeCoords(0, 0).kvY + 20},
                                      ${getNodeCoords(0, 0).x + colGap * 0.6} ${getNodeCoords(0, 0).kvY + 20},
                                      ${getNodeCoords(0, 1).x - kvNodeRadius - 6} ${getNodeCoords(0, 1).kvY - 6}`}
                                stroke="#fdba74" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "2,4" : "none"}
                            />
                            {/* RIGHT at layer 0 to pos 2 */}
                            <motion.path
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 0.5 : 0.4 }}
                                d={`M ${getNodeCoords(0, 1).x + kvNodeRadius + 4} ${getNodeCoords(0, 1).kvY - 6} 
                                    C ${getNodeCoords(0, 1).x + colGap * 0.4} ${getNodeCoords(0, 1).kvY + 20},
                                      ${getNodeCoords(0, 1).x + colGap * 0.6} ${getNodeCoords(0, 1).kvY + 20},
                                      ${getNodeCoords(0, 2).x - kvNodeRadius - 6} ${getNodeCoords(0, 2).kvY - 6}`}
                                stroke="#fdba74" strokeWidth="3" fill="none" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "2,4" : "none"}
                            />
                            {/* UP at pos 2 */}
                            <motion.line
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: selectedPath === 'all' ? 0.9 : 0.8 }}
                                x1={getNodeCoords(0, 2).x - 8} y1={getNodeCoords(0, 2).mlY - 20}
                                x2={getNodeCoords(1, 2).x - 8} y2={getNodeCoords(1, 2).kvY + 22}
                                stroke="#fdba74" strokeWidth="3" markerEnd="url(#arrow-orange)"
                                strokeDasharray={selectedPath === 'all' ? "2,4" : "none"}
                            />
                        </g>
                    )}
                </svg>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-lg text-sm border border-amber-200">
                {selectedPath === 1 && (
                    <p><strong className="text-amber-700">Path 1:</strong> Information travels <strong>UP</strong> through attention and MLP at position 0, <em>then</em> is retrieved <strong>RIGHT</strong> 2 positions via the K/V stream.</p>
                )}
                {selectedPath === 2 && (
                    <p><strong className="text-amber-700">Path 2:</strong> Information is retrieved <strong>RIGHT</strong> 1 position, processed <strong>UP</strong> 1 layer, then retrieved <strong>RIGHT</strong> again. A zig-zag through space and time.</p>
                )}
                {selectedPath === 3 && (
                    <p><strong className="text-amber-700">Path 3:</strong> Information travels <strong>RIGHT</strong> 2 positions at layer 0 (raw), <em>then</em> processed <strong>UP</strong> at the destination.</p>
                )}
                {selectedPath === 'all' && (
                    <p>The number of paths is <strong>C(m+n, n)</strong> where m = position displacement and n = layer displacement. With just 2 layers and 3 positions, there are already multiple paths—and this explodes combinatorially at scale.</p>
                )}
            </div>
        </div>
    )
}

function Diagram3_CausalGraph() {
    const [hoveredNode, setHoveredNode] = useState<{ l: number, p: number } | null>(null)
    const [showFoliations, setShowFoliations] = useState(true)

    // Grid: 4 positions (columns), 3 layers (rows)
    const positions = 4
    const layers = 3
    const colGap = 90
    const layerGap = 80
    const startX = 70
    const startY = 60

    const nodeRadius = 14

    // Foliation lines - diagonal cuts through the computation lattice
    // These show possible "time-slice" orderings - computation can happen in any order
    // that respects causal dependencies
    const foliations = [
        { x1: 30, y1: 280, x2: 60, y2: 200, label: '1' },
        { x1: 80, y1: 290, x2: 150, y2: 140, label: '2' },
        { x1: 140, y1: 290, x2: 240, y2: 90, label: '3' },
        { x1: 210, y1: 290, x2: 330, y2: 60, label: '4' },
        { x1: 280, y1: 280, x2: 400, y2: 90, label: '5' },
        { x1: 340, y1: 260, x2: 430, y2: 130, label: '6' },
        { x1: 390, y1: 230, x2: 450, y2: 170, label: '7' },
    ]

    return (
        <div className="my-12 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">The Causal Graph & Foliations</h3>
                <button
                    onClick={() => setShowFoliations(!showFoliations)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${showFoliations ? 'bg-red-500 text-white shadow' : 'bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                >
                    {showFoliations ? 'Hide' : 'Show'} Time-Slices
                </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Hover over a node to see its "light cone" (everything that influences it).
                The red diagonal lines show one possible ordering of computations.
            </p>

            <div className="bg-gray-50 rounded-lg relative flex items-center justify-center overflow-auto border border-gray-200" style={{ minHeight: '340px' }}>
                <svg width="480" height="320" viewBox="0 0 480 320" className="mx-auto">
                    <defs>
                        <marker id="arrow-kv-causal" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                            <polygon points="0 0, 6 2.5, 0 5" fill="#9333ea" />
                        </marker>
                        <marker id="arrow-res-causal" markerWidth="6" markerHeight="5" refX="2.5" refY="5" orient="auto">
                            <polygon points="0 0, 2.5 6, 5 0" fill="#1f2937" />
                        </marker>
                    </defs>

                    {/* Foliation lines (red diagonals) */}
                    {showFoliations && foliations.map((f, i) => (
                        <g key={`foliation-${i}`}>
                            <motion.line
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2}
                                stroke="#ef4444"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <text
                                x={f.x2 + 8}
                                y={f.y2 + 5}
                                className="text-sm font-bold fill-red-500"
                            >
                                {f.label}
                            </text>
                        </g>
                    ))}

                    {/* Grid of nodes with connections */}
                    {Array.from({ length: layers }).map((_, layerIdx) =>
                        Array.from({ length: positions }).map((_, posIdx) => {
                            const x = startX + posIdx * colGap
                            const y = startY + (layers - 1 - layerIdx) * layerGap

                            const isHovered = hoveredNode?.l === layerIdx && hoveredNode?.p === posIdx
                            // "In cone" = can influence the hovered node (earlier or same position, earlier or same layer)
                            const isInCone = hoveredNode && posIdx <= hoveredNode.p && layerIdx <= hoveredNode.l

                            return (
                                <g key={`node-${layerIdx}-${posIdx}`}>
                                    {/* Vertical residual connections (up) */}
                                    {layerIdx < layers - 1 && (
                                        <motion.line
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            x1={x} y1={y - nodeRadius - 2}
                                            x2={x} y2={y - layerGap + nodeRadius + 2}
                                            stroke={isInCone ? "#1f2937" : "#d1d5db"}
                                            strokeWidth={isInCone ? "2" : "1.5"}
                                            markerEnd="url(#arrow-res-causal)"
                                        />
                                    )}

                                    {/* Horizontal K/V connections (right) */}
                                    {posIdx < positions - 1 && (
                                        <motion.path
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            d={`M ${x + nodeRadius + 2} ${y} 
                                                C ${x + colGap * 0.4} ${y + 20}, 
                                                  ${x + colGap * 0.6} ${y + 20}, 
                                                  ${x + colGap - nodeRadius - 2} ${y}`}
                                            stroke={isInCone ? "#9333ea" : "#e9d5ff"}
                                            strokeWidth={isInCone ? "2" : "1.5"}
                                            fill="none"
                                            markerEnd="url(#arrow-kv-causal)"
                                        />
                                    )}

                                    {/* Node */}
                                    <g
                                        onMouseEnter={() => setHoveredNode({ l: layerIdx, p: posIdx })}
                                        onMouseLeave={() => setHoveredNode(null)}
                                        className="cursor-pointer"
                                        style={{ transition: 'opacity 0.2s' }}
                                    >
                                        <rect
                                            x={x - nodeRadius}
                                            y={y - nodeRadius}
                                            width={nodeRadius * 2}
                                            height={nodeRadius * 2}
                                            rx="4"
                                            fill={isHovered ? "#3b82f6" : isInCone ? "#c7d2fe" : "white"}
                                            stroke={isHovered ? "#2563eb" : isInCone ? "#6366f1" : "#d1d5db"}
                                            strokeWidth="2"
                                            style={{ opacity: hoveredNode && !isInCone && !isHovered ? 0.3 : 1 }}
                                        />
                                    </g>
                                </g>
                            )
                        })
                    )}

                    {/* Hover info */}
                    {hoveredNode && (
                        <text x="240" y="25" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                            Light cone for (Layer {hoveredNode.l}, Pos {hoveredNode.p})
                        </text>
                    )}

                    {/* Axis labels */}
                    <text x="240" y="305" textAnchor="middle" className="text-xs fill-gray-400">Token Position →</text>
                    <text x="20" y="160" textAnchor="middle" className="text-xs fill-gray-400" transform="rotate(-90 20 160)">Layer →</text>
                </svg>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
                <p>
                    The <strong className="text-red-600">red diagonal lines</strong> represent "foliations"—valid orderings for when computations can happen.
                    Unlike traditional views, computation doesn't have to proceed strictly left-to-right or bottom-to-top.
                    Any ordering that respects causal dependencies (can't read from a node before it's computed) is valid.
                </p>
                <p className="mt-2 text-gray-600 text-xs">
                    This connects to Wolfram's <a href="https://wolframphysics.org" className="underline hover:text-gray-900" target="_blank" rel="noopener">Physics Project</a>—the idea that causality, not strict temporal ordering, is fundamental.
                </p>
            </div>
        </div>
    )
}
